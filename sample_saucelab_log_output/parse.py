import re
import pprint

class SeleniumLogParser:
    def __init__(self,dump_dir=''):
        self.dump_dir = dump_dir
        self.log_line_items = []

    def __parse_dumpfile(self,filename):
        def get_line_dict(matcher,passed):
            info = matcher.groups()[0].decode('utf-8')
            info_split = info.split('-')

            environment = info_split[0].strip()
            environment_split = environment.split('on')
            browser = environment_split[0].strip()
            platform = environment_split[1].strip()

            test = info_split[-1].strip()
            suite = '-'.join(info_split[1:-1]).strip()

            time = matcher.groups()[1][:-1]

            return {'browser':browser,'platform':platform,'suite':suite,'test':test,'time':time,'passed':passed}
        
        f = open(filename,'rb')

        for line in f:
            log_line_pass = re.compile(b'\x93\s*(.*).*\x1b.*\((.*)\)')
            log_line_fail = re.compile(b'\x97\s*(.*).*\x1b.*\((.*)\)')
            m_pass = log_line_pass.search(line)
            m_fail = log_line_fail.search(line)

            if m_pass or m_fail:
                line_dict = get_line_dict(m_pass or m_fail,m_pass is not None)
                self.log_line_items.append(line_dict)

    def __parse_all(self):
        for x in range(6): #TODO: read files from sys object
            self.__parse_dumpfile('dump_'+str(x+1))
            print(x+1)


    def get_report_by_browser(self):
        if not self.log_line_items:
            self.__parse_all()

        report = {}
        
        for item in self.log_line_items:
            browser = report.setdefault(item['browser'],{})
            platform = browser.setdefault(item['platform'],{})

            tests = platform.setdefault(item['suite'],{'tests':[],'success':True})
            tests['tests'].append(item)

            if not item['passed']:
                tests['success'] = False

        return report

    
if __name__ == "__main__":
    SLP = SeleniumLogParser('dump_1')
    SLP.get_report_by_browser()
    #pprint.pprint(SLP.get_report_by_browser(),width=300)
    #print(SLP.get_report())
    
