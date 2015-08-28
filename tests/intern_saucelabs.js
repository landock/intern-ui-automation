// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
define([ 'intern' ], function (intern) {
	var cmdArgs = intern.args;
	var increment = parseInt(cmdArgs.increment);
    //var browserName = cmdArgs.browserName;
    //var version = cmdArgs.version;
    //var platform = cmdArgs.platform;
	var portNum = 50000;//4444;
	var proxyPortNum = 9000;
	
	
	return {
		// baseUrl:'https://localhost:5561/',
		proxyPort: proxyPortNum + increment,
		proxyUrl: 'http://localhost:9000/',
		defaultTimeout: 1200000,
		capabilities: {
			'ie.ensureCleanSession' : true
		},
		
		environments: [
            //{ 'browserName': browserName, 'version': version, 'platform': platform },
            //{ browserName: 'internet explorer', version: '8', platform: 'Windows XP' },
            { browserName: 'internet explorer', version: '10', platform: 'Windows 8' },
            { browserName: 'internet explorer', version: '11', platform: 'Windows 8.1' } ,
            { browserName: 'internet explorer', version: '9', platform: 'Windows 7' },
            { browserName: 'firefox', version: '38.0', platform: ['Windows 8.1', 'OS X 10.10'] },
            { browserName: 'chrome', version: '43.0', platform: ['Windows 8.1', 'OS X 10.10' ] },
            { browserName: 'safari', version: '8', platform: 'OS X 10.10' }
            // { browserName: 'safari', version: '7', platform: 'OS X 10.9' },
    	],
		
		maxconcurrency: Infinity,
		
		tunnel: 'SauceLabsTunnel',
		
		tunnelOptions: {
			username: 'awan',
			accessKey: '8a05a809-6b01-4bc6-80f0-83d934a78ea9',
			port: portNum + increment			
		},
		
		functionalSuites: [
            //set dynamically
		],

    	excludeInstrumentation: /^(?:tests|node_modules)\//
	}
});
