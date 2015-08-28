import re
import pprint
import io
import jinja2
import datetime

class SeleniumLogParser:
    def __init__(self):
        self.__log_stream_data={}
        self.__log_line_items = []
    
    def append_log_data_to_memory(self,batch_name,append_data):
        log_data = self.__log_stream_data.setdefault(batch_name,io.BytesIO())
        log_data.write(append_data)

    def __parse_dumpdata(self,stream):
        def get_line_dict(matcher,passed):
            info = matcher.groups()[0].decode('utf-8')
            info_split = info.split('-')

            environment = info_split[0].strip()
            environment_split = environment.split('on')
            browser = environment_split[0].strip()
            platform = environment_split[1].strip()

            test = info_split[-1].strip()
            suite = '-'.join(info_split[1:-1]).strip()

            time = matcher.groups()[1][:-1].decode('utf-8')

            return {'browser':browser,'platform':platform,'suite':suite,'test':test,'time':time,'passed':passed}
        
        stream.seek(0) 
        for line in stream:
            log_line_pass = re.compile(b'\x93\s*(.*).*\x1b.*\((.*)\)')
            log_line_fail = re.compile(b'\x97\s*(.*).*\x1b.*\((.*)\)')
            m_pass = log_line_pass.search(line)
            m_fail = log_line_fail.search(line)

            if m_pass or m_fail:
                line_dict = get_line_dict(m_pass or m_fail,m_pass is not None)
                self.__log_line_items.append(line_dict)

        stream.close()

    def __parse_all(self,dump_path):
        if dump_path:
            for x in range(6):
                self.__parse_dumpdata(open(dump_path+'/dump_'+str(x+1),'rb'))
        else:
            for k,v in self.__log_stream_data.items():
                self.__parse_dumpdata(v)


    def __get_report_data_by_browser(self,dump_path):
        if not self.__log_line_items:
            self.__parse_all(dump_path)

        report = {}
        
        suite_count=0
        for item in self.__log_line_items:
            browser = report.setdefault(item['browser'],{'platforms':{},'success_count':0,'total':0})
            
            platform = browser['platforms'].setdefault(item['platform'],{'suites':{},'success_count':0,'total':0})
            
            if item['suite'] not in platform['suites']:
                suite_count+=1
                browser['total']+=1
                platform['total']+=1
                browser['success_count']+=1
                platform['success_count']+=1

            if not item['passed']:
                browser['success_count']-=1
                platform['success_count']-=1

            tests = platform['suites'].setdefault(item['suite'],{'tests':[],'success':True,'sort_order':suite_count})
            
            tests['tests'].append(item)

            if not item['passed']:
                tests['success'] = False

        return report
    
    def generate_report(self,dump_path=""):
        data = self.__get_report_data_by_browser(dump_path)
        templateLoader = jinja2.FileSystemLoader(searchpath="templates")
        env = jinja2.Environment( loader=templateLoader )
        template = env.get_template('report.html')

        def by_sort_order(item):
            return item[1]['sort_order']

        for browser in data:
            for platform in data[browser]['platforms']:
                suites_dict = data[browser]['platforms'][platform]['suites']
                sorted_suites_list = sorted(suites_dict.items(),key=by_sort_order)
                data[browser]['platforms'][platform]['suites'] = sorted_suites_list

        timestamp = datetime.datetime.now().strftime("%d %B %Y %H:%M")
        html = template.render({'results':data,'timestamp':timestamp})
        f=open('report.html','w')
        f.write(html)
        f.close()

if __name__ == "__main__":
    SLP = SeleniumLogParser()
    SLP.generate_report('dumps_for_regen')
