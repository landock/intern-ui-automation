import subprocess
import time
from saucelab_environments import ENVIRONMENT_COUNT, MAX_VMS, TESTS
from threading import Thread, Lock
import math

class SauceRunner:
    
    def __init__(self):
        self.batch_id=0
        self.inc_lock = Lock()

    def get_batch_cmd(self):
        num_tests = len(TESTS)
        #print('num_tests',num_tests)
        vms_per_batch = ENVIRONMENT_COUNT 
        #print('vms_per_batch',vms_per_batch)
        max_num_concurrent_batches = MAX_VMS // vms_per_batch
        #print('max_num_concurrent_batches',max_num_concurrent_batches)
        
        num_test_per_batch = num_tests // max_num_concurrent_batches

        if num_test_per_batch == 0: 
            num_test_per_batch = 1
            max_num_concurrent_batches = num_tests 

        for x in range(max_num_concurrent_batches):
            cmd = 'node node_modules/intern/bin/intern-runner.js config="tests/intern_saucelabs_config" increment="{}"'.format(x)
            start_slice = x * num_test_per_batch
            end_slice = start_slice + (num_test_per_batch if x < max_num_concurrent_batches-1 else num_tests)
            test_list = (TESTS[start_slice: end_slice])
            for test in test_list:
                cmd += ' functionalSuites="{}"'.format(test)
            #cmd = 'python stdout_test.py ' + str(x)
            yield cmd 

    def __get_output(self,p,batch_id):
        #stdout = []
        f=open('dumps/dump_'+str(batch_id),'wb')
        while True:
            line = p.stdout.readline()
            #stdout.append(line)
            #print(line)
            if line != b'':
                pretty=line.decode('UTF-8','ignore')
                f.write(bytes(pretty,'UTF-8'))
            if p.poll() != None:
                f.close()
                #with self.inc_lock:
                    #self.batch_id-=1
                break
            #if line == '' and p.poll() != None:
                #break
        #return ''.join(stdout)

    def __launch_test(self,cmd):
        print('running cmd', cmd)
        p=subprocess.Popen(cmd,shell=True,stderr=subprocess.STDOUT,stdout=subprocess.PIPE,universal_newlines=False)
        #self.__get_output(p)
        Thread(target=self.__get_output,args=(p,self.batch_id)).start()
        #print(p.communicate())
        
        #print('cmd done',cmd)
        #with self.inc_lock:
            #self.batch_id-=1
        
    def run_tests(self):
            cmds = self.get_batch_cmd()
            next_cmd = next(cmds,False) 
            while next_cmd:
                if self.batch_id < MAX_VMS:
                    with self.inc_lock:
                        self.batch_id+=1
                    #Thread(target=self.__launch_test,args=(next_cmd,)).start()
                    self.__launch_test(next_cmd)
                    next_cmd=next(cmds,False)
                    time.sleep(4)
                else:
                    time.sleep(1) 

            print('batch count:',self.batch_id)

if __name__ == "__main__":
    SR=SauceRunner()
    SR.run_tests()
