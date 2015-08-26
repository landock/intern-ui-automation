import subprocess
import time
from config import ENVIRONMENT_COUNT, MOBILE_ENVIRONMENT_COUNT, MAX_VMS, TESTS, MOBILE_TESTS
import threading
from threading import Thread, Lock
import requests
import sys
from selenium_log_parser import SeleniumLogParser

class SauceRunner:
    
    def __init__(self):
        self.batch_id=0
        self.active_vm_count = 0
        self.inc_lock = Lock()
        self.parser = SeleniumLogParser()

    def __get_batch_cmd(self,isDesktop):
        tests = TESTS if isDesktop else MOBILE_TESTS
        num_tests = len(tests)
        #print('num_tests',num_tests)
        vms_per_batch = ENVIRONMENT_COUNT if isDesktop else MOBILE_ENVIRONMENT_COUNT
        #print('vms_per_batch',vms_per_batch)
        max_num_concurrent_batches = MAX_VMS // vms_per_batch
        #print('max_num_concurrent_batches',max_num_concurrent_batches)
        
        num_test_per_batch = num_tests // max_num_concurrent_batches

        if num_test_per_batch == 0: 
            num_test_per_batch = 1
            max_num_concurrent_batches = num_tests 

        for x in range(max_num_concurrent_batches):
            config = 'tests/intern_saucelabs_config' if isDesktop else 'tests/intern_mobile_saucelabs_config'
            cmd = 'node node_modules/intern/bin/intern-runner.js config="{}" increment="{}"'.format(config,self.batch_id)
            start_slice = x * num_test_per_batch
            end_slice = start_slice + (num_test_per_batch if x < max_num_concurrent_batches-1 else num_tests)
            
            test_list = (tests[start_slice: end_slice])
            for test in test_list:
                cmd += ' functionalSuites="{}"'.format(test)
            yield cmd 

    def __get_output(self,p,batch_id,vms_required):
        #stdout = []
        f=open('dumps/dump_'+str(batch_id),'wb')
        while True:
            line = p.stdout.readline()
            if line != b'':
                #utf=line.decode('UTF-8','ignore')
                #f.write(bytes(pretty,'UTF-8'))
                f.write(line)
                self.parser.append_log_data_to_memory('dump_'+str(batch_id),line)
            if p.poll() != None:
                f.close()
                with self.inc_lock:
                    self.active_vm_count -= vms_required
                    #pass
                break
           

    def __launch_test(self,cmd,vms_required):
        print('running cmd', cmd)
        p=subprocess.Popen(cmd,shell=True,stderr=subprocess.STDOUT,stdout=subprocess.PIPE,universal_newlines=False,cwd='../')
        #p=subprocess.Popen('python stdout_test.py',shell=True,stderr=subprocess.STDOUT,stdout=subprocess.PIPE,universal_newlines=False)
        Thread(target=self.__get_output,args=(p,self.batch_id,vms_required)).start()


    def __wait_for_available_VMs(self,isDesktop):
        #cmds = cmd_generator()
        
        cmd_generator = self.__get_batch_cmd(isDesktop)
        vms_per_batch = ENVIRONMENT_COUNT if isDesktop else MOBILE_ENVIRONMENT_COUNT

        next_cmd = next(cmd_generator,False) 
        while next_cmd:
            if self.active_vm_count + vms_per_batch <= MAX_VMS:
                with self.inc_lock:
                    self.batch_id+=1
                    print('incrementing',vms_per_batch)
                    self.active_vm_count += vms_per_batch
                self.__launch_test(next_cmd,vms_per_batch)
                next_cmd=next(cmd_generator,False)
                time.sleep(4)
            else:
                time.sleep(1) 

            print('batch count:',self.batch_id)
            print('active vm count:',self.active_vm_count)

        
    def run_tests(self,runDesktop=True,runMobile=True):
            #Desktop = True
            #Mobile = False
            if runDesktop:
                self.__wait_for_available_VMs(True)

            if runMobile:
                self.__wait_for_available_VMs(False)

            while threading.active_count() > 1:
                print('active vm count',self.active_vm_count)
                print('threading count',threading.active_count())
                time.sleep(3)
            self.parser.generate_report()
            #self.__delete_tunnels()

    def __delete_tunnels(self):
        username = "awan"
        access_key = "8a05a809-6b01-4bc6-80f0-83d934a78ea9"
        tunnel_ids = requests.get("https://saucelabs.com/rest/v1/awan/tunnels", auth = (username, access_key)).json()
        for tunnel in tunnel_ids:
            requests.delete("https://saucelabs.com/rest/v1/awan/tunnels/" + tunnel, auth = (username, access_key))

if __name__ == "__main__":
    SR=SauceRunner()

    runMobile = runDesktop = True
    arg = sys.argv[1] if len(sys.argv)>1 else None
    if arg:
        if arg.upper() == "MOBILE":
            runDesktop = False
        elif arg.upper() == "DESKTOP":
            runMobile = False

    print(runDesktop,runMobile)
    SR.run_tests(runDesktop,runMobile)
