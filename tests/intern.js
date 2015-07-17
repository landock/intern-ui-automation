// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
define({

    // baseUrl:'https://localhost:5561/',
    // proxyPort: 9000,
    proxyUrl: 'http://localhost:9000/',
    defaultTimeout: 1200000,
    capabilities: {
        emulator:false
// 'chromeOptions': {
//     'androidPackage': 'com.android.chrome',
//   }
        // 'selenium-version': '2.43.0'
    },

    environments: [
        { browserName: 'firefox'},
        // { browserName: 'android'}
        //{ browserName: 'internet explorer'},
        { browserName: 'chrome'}
        // { browserName: 'firefox', platform: ['WINDOWS', 'MAC']  }
        // { browserName: 'phantomjs'}
        // { browserName: 'safari' },

         //{ browserName: 'internet explorer', version: '8', platform: 'Windows XP' },
        //{ browserName: 'internet explorer', version: '10', platform: 'Windows 8' },
        // { browserName: 'internet explorer', version: '11', platform: 'Windows 8.1' } ,
        //{ browserName: 'internet explorer', version: '9', platform: 'Windows 7' },
        //{ browserName: 'firefox', version: '38.0', platform: ['Windows 8.1', 'OS X 10.10'] },
        //{ browserName: 'chrome', version: '43.0', platform: ['Windows 8.1', 'OS X 10.10' ] }
        // { browserName: 'safari', version: '8', platform: 'OS X 10.10' }
        // { browserName: 'safari', version: '7', platform: 'OS X 10.9' },
        // { browserName: 'android', version: '4.3', deviceName:'Samsung Galaxy S4 Emulator', platform: 'Linux' }
    // { browserName: 'iphone', version: '8.2', deviceName:'iPhone Simulator', platform: 'OS X 10.10' }
    ],

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

    functionalSuites: [
        //'tests/functional/testHeaderLoginAndLogout'
        //'tests/functional/createNIOrder'
        //'tests/functional/customCommandTest'
        //'tests/functional/createRIOrder'
        // 'tests/functional/homepageSignInButtonCanBeClicked',
        //'tests/functional/signInFromHomePage'
        //'tests/functional/createNIS&SOrder'
        // 'tests/functional/createRIS&SOrder'   BROKEN
        //'tests/functional/RI_Reorder_OnePrescript'
        //'tests/functional/addressEditingTest'
        'tests/functional/addSolutionToCart'
    ],
    excludeInstrumentation: /^(?:tests|node_modules)\//
});
