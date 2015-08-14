// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
define([ 'intern' ], function (intern) {
	var cmdArgs = intern.args;
	var increment = parseInt(cmdArgs.increment);
    var browserName = cmdArgs.browserName;
    var version = cmdArgs.version;
    var platform = cmdArgs.platform;
	var portNum = 4444;
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
            { 'browserName': browserName, 'version': version, 'platform': platform },
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
