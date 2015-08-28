import subprocess
import time
from config import *
import threading
from threading import Thread, Lock
import requests
import sys
from selenium_log_parser import SeleniumLogParser
import re
import os

class SauceRunner:
    
    def __init__(self,environment):
        self.batch_id=0
        self.active_vm_count = 0
        self.inc_lock = Lock()
        self.parser = SeleniumLogParser()
        self.environment = environment

    def __get_batch_cmd(self):
        tests = TESTS if self.environment['isDesktop'] else MOBILE_TESTS
        num_tests = len(tests)
        
        if self.environment['isLocal']:
            max_num_concurrent_batches = 1
            num_test_per_batch = num_tests
        else:
            vms_per_batch = self.environment['environment_count']
            max_num_concurrent_batches = MAX_VMS // vms_per_batch
        
            num_test_per_batch = num_tests // max_num_concurrent_batches

            if num_test_per_batch == 0: 
                num_test_per_batch = 1
                max_num_concurrent_batches = num_tests 

        for x in range(max_num_concurrent_batches):
            cmd = 'node node_modules/intern/bin/intern-runner.js config="{}" increment="{}"'.format(self.environment['config'],self.batch_id)
            start_slice = x * num_test_per_batch
            end_slice = start_slice + (num_test_per_batch if x < max_num_concurrent_batches-1 else num_tests)
            
            test_list = (tests[start_slice: end_slice])
            for test in test_list:
                cmd += ' functionalSuites="{}"'.format(test)
            yield cmd 

    def __get_output(self,p,batch_id,vms_required):

        filename = 'dumps/dump_'+str(batch_id)
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        f=open(filename,'wb')

        log_end = re.compile(b'TOTAL: tested \d+ platforms, .* tests failed')
        collect_log = True
        while collect_log:
            line = p.stdout.readline()
            if line != b'':
                f.write(line)
                self.parser.append_log_data_to_memory('dump_'+str(batch_id),line)
                m_end = log_end.search(line)
                collect_log = m_end is None

            if not collect_log:
                f.close()
                with self.inc_lock:
                    self.active_vm_count -= vms_required
                if p.poll() == None:
                    p.terminate()

    def __launch_test(self,cmd,vms_required):
        print('running cmd', cmd)
        p=subprocess.Popen(cmd,shell=True,stderr=subprocess.STDOUT,stdout=subprocess.PIPE,universal_newlines=False,cwd='../')
        #p=subprocess.Popen('python stdout_test.py'+str(self.batch_id),shell=True,stderr=subprocess.STDOUT,stdout=subprocess.PIPE,universal_newlines=False)
        Thread(target=self.__get_output,args=(p,self.batch_id,vms_required)).start()


    def __wait_for_available_VMs(self):
        
        cmd_generator = self.__get_batch_cmd()
        vms_per_batch = self.environment['environment_count']

        next_cmd = next(cmd_generator,False) 

        if self.environment['isLocal']:
            selcmd = "java -jar selenium-server-standalone-2.46.0.jar -log selenium.log"
            p=subprocess.Popen(selcmd,shell=True,stderr=subprocess.STDOUT,stdout=subprocess.PIPE,universal_newlines=False,cwd='../lib')

        while next_cmd:
            if self.active_vm_count + vms_per_batch <= MAX_VMS:
                with self.inc_lock:
                    self.batch_id+=1
                    print('incrementing',vms_per_batch)
                    self.active_vm_count += vms_per_batch
                self.__launch_test(next_cmd,vms_per_batch)
                next_cmd=next(cmd_generator,False)
                time.sleep(10)
            else:
                time.sleep(1) 

            print('batch count:',self.batch_id)
            print('active vm count:',self.active_vm_count)

        
    def run_tests(self):
            self.__wait_for_available_VMs()

            while threading.active_count() > 1:
                print('active vm count',self.active_vm_count)
                print('threading count',threading.active_count())
                time.sleep(3)
            self.parser.generate_report()

            if self.environment['isLocal']:
                selcmd = "curl http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer"
                p=subprocess.Popen(selcmd,shell=True,stderr=subprocess.STDOUT,stdout=subprocess.PIPE,universal_newlines=False)
            else:
               self.__delete_tunnels()

    def __delete_tunnels(self):
        username = "awan"
        access_key = "8a05a809-6b01-4bc6-80f0-83d934a78ea9"
        tunnel_ids = requests.get("https://saucelabs.com/rest/v1/awan/tunnels", auth = (username, access_key)).json()
        for tunnel in tunnel_ids:
            requests.delete("https://saucelabs.com/rest/v1/awan/tunnels/" + tunnel, auth = (username, access_key))

if __name__ == "__main__":

    local_or_saucelabs = sys.argv[1] if len(sys.argv)>2 else None
    desktop_or_local = sys.argv[2] if len(sys.argv)>2 else None
    
    environment = None
    if local_or_saucelabs and desktop_or_local:
        if local_or_saucelabs.upper() == "SAUCELABS":
            if desktop_or_local.upper() == "DESKTOP":
                environment = ENVIRONMENTS["saucelabs_desktop"]
            elif desktop_or_local.upper() == "MOBILE":
                environment = ENVIRONMENTS["saucelabs_mobile"]
        elif local_or_saucelabs.upper() == "LOCAL":
            if desktop_or_local.upper() == "DESKTOP":
                environment = ENVIRONMENTS["local_desktop"]
            elif desktop_or_local.upper() == "MOBILE":
                environment = ENVIRONMENTS["local_mobile"]

    if environment:
        SR=SauceRunner(environment)
        SR.run_tests()
    else:
        print("Please specify one of the following:\n\nSAUCELABS DESKTOP\nSAUCELABS MOBILE\nLOCAL DESKTOP\nLOCAL MOBILE") 
