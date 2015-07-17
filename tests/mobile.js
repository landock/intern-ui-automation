define({

    // baseUrl:'https://localhost:5561/',
    // proxyPort: 9000,
    proxyUrl: 'http://localhost:9000/',
    defaultTimeout: 1200000,
    capabilities: {
        'chromeOptions': {
            mobileEmulation: { "deviceName": "Google Nexus 5" }
        }
        // 'selenium-version': '2.43.0'
    },

    environments: [ { browserName: 'chrome'} ],

    maxConcurrency: Infinity,
    tunnel: 'NullTunnel',
    //tunnel: 'SauceLabsTunnel',

    tunnelOptions:{
        //username: 'awan',
        //accessKey: '8a05a809-6b01-4bc6-80f0-83d934a78ea9'
    },

    // Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
    // can be used here
    //loader: {
    //	 //Packages that should be registered with the loader in each testing environment
    //	packages: [ { name: 'app', location: 'tests/app' } ]
    //},
    suites: null,
    
    functionalSuites: [ 
        //'tests/functional/signIn'
        //'tests/functional/addressEditingTest'
    ],

    excludeInstrumentation: /^(?:tests|node_modules)\//
});
