import subprocess
import time
from saucelab_environments import environments, tests
from threading import Thread, Lock

class SauceRunner:
    
    def __init__(self,max_vms=50):
        self.max_vms=max_vms
        self.running_tests_count=0
        self.inc_lock = Lock()


    def get_cmds(self):
        port_inc=0
        for test in tests:
            for environment in environments:
                cmd = 'node node_modules/intern/bin/intern-runner.js config=tests/intern_saucelabs_config increment="{}" functionalSuites="{}" browserName="{}" version="{}" platform="{}"'\
                .format(port_inc,test,environment['browserName'],environment['version'],environment['platform'])
                yield cmd 
                # return
                port_inc+=1

    def __launch_test(self,cmd):
        print('running cmd', cmd)
        p=subprocess.Popen(cmd,shell=True,stderr=subprocess.PIPE,stdout=subprocess.PIPE)
        print(p.communicate())
        # print('running cmd',cmd)
        # time.sleep(2)
        print('cmd done',cmd)
        with self.inc_lock:
            self.running_tests_count-=1
        
    
    def run_tests(self):
            cmds = self.get_cmds()
            next_cmd = next(cmds,False) 
            while next_cmd:
                if self.running_tests_count < self.max_vms:
                    with self.inc_lock:
                        self.running_tests_count+=1
                    Thread(target=self.__launch_test,args=(next_cmd,)).start()
                    next_cmd=next(cmds,False)
                else:
                    time.sleep(1) 

if __name__ == "__main__":
    SR=SauceRunner()
    SR.run_tests()
