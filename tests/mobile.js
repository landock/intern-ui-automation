define({

    // baseUrl:'https://localhost:5561/',
    // proxyPort: 9000,
    proxyUrl: 'http://localhost:9000/',
    defaultTimeout: 1200000,
    capabilities: {
        'chromeOptions': {
            mobileEmulation: { 'deviceName': 'Google Nexus 5' }
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
        // 'tests/functional/mobile/mobileSignInTest',
        // 'tests/functional/mobile/mobileAddressEditingTest',
        // 'tests/functional/mobile/mobileChangeDefaultAddressTest',
        // 'tests/functional/mobile/mobileSignInFromCart',
        // 'tests/functional/mobile/mobileAddContactLensesToCart',
        // 'tests/functional/mobile/mobileAddContactSolutionToCart',
        // 'tests/functional/mobile/mobileChangeItemQuantityInCart',
        // 'tests/functional/mobile/mobileRemoveItemFromCart',
        // 'tests/functional/mobile/mobileCreateNewAccount',
        // 'tests/functional/mobile/mobileChangePassword',
        'tests/functional/mobile/mobileCheckoutAmericanExpress',
        'tests/functional/mobile/mobileCheckoutVisa',
        // 'tests/functional/mobile/mobileCheckoutMasterCard',
        // 'tests/functional/mobile/mobileCheckoutDiscover',
        // 'tests/functional/mobile/mobileResetPasswordTest',
        // 'tests/functional/mobile/mobileValidateOrderHistory',
        // 'tests/functional/mobile/mobileAddRemoveCoupon',
        'tests/functional/mobile/mobileCheckoutPayPal'
    ],

    excludeInstrumentation: /^(?:tests|node_modules)\//
});
