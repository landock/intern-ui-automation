import subprocess
import time
from saucelab_environments import environments, tests

class SauceRunner:
    def __init__(self,max_vms=50):
        self.max_vms=max_vms

    def get_cmds(self):
        port_inc=0
        for test in tests:
            for environment in environments:
                cmd = 'node node_modules/intern/bin/intern-runner.js config=tests/intern_saucelabs_config increment="{}" functionalSuites="{}" browserName="{}" version="{}" platform="{}"'.format(port_inc,test,environment['browserName'],environment['version'],environment['platform'])
                yield cmd 
                port_inc+=1
            #p=subprocess.Popen(cmd,shell=True,stderr=subprocess.PIPE,stdout=subprocess.PIPE)


    def run_tests(self):
        for cmd in self.get_cmds():
            p=subprocess.Popen(cmd,shell=True,stderr=subprocess.PIPE,stdout=subprocess.PIPE)
            print(p.communicate())
            break;

if __name__ == "__main__":
    SR=SauceRunner()
    SR.run_tests()
