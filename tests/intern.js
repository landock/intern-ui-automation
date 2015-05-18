// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
define({

    //	baseUrl:'https://localhost:5561/',
    //	proxyPort: 9000,
    //	proxyUrl: 'http://localhost:9000/',
    //	capabilities: {
    //		'selenium-version': '2.45.0'
    //	},

    environments: [
    // { browserName: 'firefox' }
    { browserName: 'chrome' }
    //{ browserName: 'safari' },

    //	{ browserName: 'internet explorer', version: '8', platform: 'Windows XP' }
    //	{ browserName: 'internet explorer', version: '11', platform: 'Windows 8.1' },
    //	{ browserName: 'internet explorer', version: '10', platform: 'Windows 8' }
    //	{ browserName: 'internet explorer', version: '9', platform: 'Windows 7' }
    //	{ browserName: 'firefox', version: '36', platform: ['Windows 7', 'OS X 10.10'] }
    //	{ browserName: 'chrome', version: '41', platform: [ 'OS X 10.10' ] }
    //	{ browserName: 'safari', version: '7', platform: 'OS X 10.9' },
    //	{ browserName: 'safari', version: '8', platform: 'OS X 10.10' }
    //	{ browserName: 'android', version: '4.3', deviceName:'Samsung Galaxy S4 Emulator', platform: 'Linux' }
    //	{ browserName: 'iphone', version: '8.2', deviceName:'iPhone Simulator', platform: 'OS X 10.10' }
    ],

    maxConcurrency: 1,
    tunnel: 'NullTunnel',
    //tunnel: 'SauceLabsTunnel',

    //tunnelOptions:{
    //username: 'asdfghjklzxcvbnm',
    //accessKey: '67f299a9-a3dc-4868-b17b-c7f51029af08'
    //},

    // Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
    // can be used here
    //loader: {
    //	 //Packages that should be registered with the loader in each testing environment
    //	packages: [ { name: 'app', location: 'tests/app' } ]
    //},

    functionalSuites: [
        //'tests/functional/createNIOrder'
        //'tests/functional/createRIOrder'
        // 'tests/functional/createNIS&SOrder'
        // 'tests/functional/createRIS&SOrder'
        'tests/functional/RI_Reorder_OnePrescript'
    ],
    excludeInstrumentation: /^(?:tests|node_modules)\//
});
