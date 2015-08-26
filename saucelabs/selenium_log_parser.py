import re
import pprint
import io
import jinja2

class SeleniumLogParser:
    def __init__(self):
        self.__log_stream_data={}
        self.__log_line_items = []
    
    def append_log_data_to_memory(self,batch_name,append_data):
        # TODO: make this a buffer or something, concat bad?
        #log_data = self.__log_stream_data.setdefault(batch_name,b'')

        log_data = self.__log_stream_data.setdefault(batch_name,io.BytesIO())
        log_data.write(append_data)
        #self.__parse_dumpdata(io.BytesIO(v))
        

        #print('append_data:',append_data)
        #log_data += append_data
        #print('ld',type(log_data))
        #print('ad',type(append_data))
        #print(log_data)
        #input()
        #self.__log_stream_data[batch_name] = log_data

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
        #f = open(filename,'rb')
        for line in stream:
            #line = line.encode('UTF-8','ignore')
            #line = bytes(line,'utf-8')
            #print(type(line))
            #print('result',line)
            log_line_pass = re.compile(b'\x93\s*(.*).*\x1b.*\((.*)\)')
            log_line_fail = re.compile(b'\x97\s*(.*).*\x1b.*\((.*)\)')
            m_pass = log_line_pass.search(line)
            m_fail = log_line_fail.search(line)

            if m_pass or m_fail:
                #print('regex match')
                #input()
                line_dict = get_line_dict(m_pass or m_fail,m_pass is not None)
                self.__log_line_items.append(line_dict)

        stream.close()

    def __parse_all(self):
        #for x in range(6): #TODO: read files from sys object
            #self.__parse_dumpfile('dump_'+str(x+1))
            #print(x+1)
        #print('len',len(self.__log_stream_data))
        for k,v in self.__log_stream_data.items():
            #print('key',k)
            #print('value',v)
            self.__parse_dumpdata(v)


    def __get_report_data_by_browser(self):
        if not self.__log_line_items:
            self.__parse_all()

        report = {}
        
        for item in self.__log_line_items:
            browser = report.setdefault(item['browser'],{})
            platform = browser.setdefault(item['platform'],{})

            tests = platform.setdefault(item['suite'],{'tests':[],'success':True})
            tests['tests'].append(item)

            if not item['passed']:
                tests['success'] = False

        return report
    
    def generate_report(self):
        data = self.__get_report_data_by_browser()
        #print(data)
        templateLoader = jinja2.FileSystemLoader(searchpath="templates")
        env = jinja2.Environment( loader=templateLoader )
        template = env.get_template('report.html')
        #stream = template.stream({'testvar':'boo'})
        #print(template.render({'testvar':'boo'}))
        html = template.render({'results':data})
        f=open('report.html','w')
        f.write(html)
        f.close()
        pprint.pprint(data,width=300)
        #for line in stream:
            #print(line)
            #f.write()
    
#if __name__ == "__main__":
    #SLP = SeleniumLogParser('dump_1')
    #SLP.get_report_by_browser()
    #pprint.pprint(SLP.get_report_by_browser(),width=300)
    #print(SLP.get_report())
    
