// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
define([ 'intern' ], function (intern) {
	
	return {
		proxyPort: 90000,
		proxyUrl: 'http://localhost:9000/',
		defaultTimeout: 1200000,
		capabilities: {
			'ie.ensureCleanSession' : true
		},
		
		environments: [
        { browserName: 'firefox'},
        { browserName: 'internet explorer'},
        { browserName: 'chrome'}

    	],
		
		maxconcurrency: Infinity,
		
		tunnel: 'NullTunnel',
		
		tunnelOptions: {
			
		},
		
		functionalSuites: [
			// added dynamically
		],

    	excludeInstrumentation: /^(?:tests|node_modules)\//
	}
});
