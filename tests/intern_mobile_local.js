define({

    proxyPort: 9000,
    proxyUrl: 'http://localhost:9000/',
    defaultTimeout: 1200000,
    capabilities: {
        'chromeOptions': {
            mobileEmulation: { 'deviceName': 'Google Nexus 5' }
        }
    },

    environments: [ 
        { browserName: 'chrome'} 
    ],

    maxConcurrency: Infinity,
    tunnel: 'NullTunnel',

    tunnelOptions:{
        port : 4445
    },

    suites: null,
    
    functionalSuites: [ 
        // added dynamically
    ],

    excludeInstrumentation: /^(?:tests|node_modules)\//
});
