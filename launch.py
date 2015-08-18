import subprocess
import time
from saucelab_environments import ENVIRONMENT_COUNT, MAX_VMS, TESTS
from threading import Thread, Lock
import math

class SauceRunner:
    
    def __init__(self):
        self.running_batch_count=0
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
            yield cmd 

    def __launch_test(self,cmd):
        print('running cmd', cmd)
        p=subprocess.Popen(cmd,shell=True,stderr=subprocess.PIPE,stdout=subprocess.PIPE)
        print(p.communicate())
        print('cmd done',cmd)
        with self.inc_lock:
            self.running_batch_count-=1
        
    def run_tests(self):
            cmds = self.get_batch_cmd()
            next_cmd = next(cmds,False) 
            while next_cmd:
                if self.running_batch_count < MAX_VMS:
                    with self.inc_lock:
                        self.running_batch_count+=ENVIRONMENT_COUNT
                    Thread(target=self.__launch_test,args=(next_cmd,)).start()
                    next_cmd=next(cmds,False)
                else:
                    time.sleep(1) 

if __name__ == "__main__":
    SR=SauceRunner()
    SR.run_tests()
