// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
define({

    // baseUrl:'https://localhost:5561/',
    proxyPort: 9000,
    proxyUrl: 'http://localhost:9000/',
    defaultTimeout: 1200000,
    capabilities: {
        'ie.ensureCleanSession' : true
        // 'chromeOptions': {
        //     'androidPackage': 'com.android.chrome',
        //   }
        // 'selenium-version': '2.43.0'
    },

    environments: [
        // { browserName: 'firefox'},
        // { browserName: 'android'}
        // { browserName: 'internet explorer'}
        // { browserName: 'chrome'}
        // { browserName: 'firefox', platform: ['WINDOWS', 'MAC']  }
        // { browserName: 'phantomjs'}
        // { browserName: 'safari' },

        { browserName: 'internet explorer', version: '8', platform: 'Windows XP' },
        { browserName: 'internet explorer', version: '10', platform: 'Windows 8' },
        { browserName: 'internet explorer', version: '11', platform: 'Windows 8.1' } ,
        { browserName: 'internet explorer', version: '9', platform: 'Windows 7' },
        { browserName: 'firefox', version: '38.0', platform: ['Windows 8.1', 'OS X 10.10'] },
        { browserName: 'chrome', version: '43.0', platform: ['Windows 8.1', 'OS X 10.10' ] },
        { browserName: 'safari', version: '8', platform: 'OS X 10.10' }
        // { browserName: 'safari', version: '7', platform: 'OS X 10.9' },
    ],

    maxConcurrency: Infinity,
    // tunnel: 'NullTunnel',
    tunnel: 'SauceLabsTunnel',

    tunnelOptions:{
        username: 'awan',
        accessKey: '8a05a809-6b01-4bc6-80f0-83d934a78ea9'
    },

    // Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
    // can be used here
    //loader: {
    //	 //Packages that should be registered with the loader in each testing environment
    //	packages: [ { name: 'app', location: 'tests/app' } ]
    //},

    functionalSuites: [
        "tests/functional/account/resetPasswordEmail",
        "tests/functional/account/logoutFromAccountPage",
        "tests/functional/account/changePassword",
        "tests/functional/account/createNewAccount",
        "tests/functional/account/validateOrderHistory",
        "tests/functional/payment/checkoutAmericanExpress",
        "tests/functional/payment/checkoutDiscover",
        "tests/functional/payment/checkoutMastercard",
        "tests/functional/payment/checkoutVisa",
        "tests/functional/payment/checkoutPayPal",
        "tests/functional/signin/signInWithFaceBook",
        "tests/functional/signin/signInWithGooglePlus",
        "tests/functional/signin/signInWithAmazon",
        "tests/functional/signin/signInFromHomePage",
        "tests/functional/signin/signInFromCart",
        "tests/functional/cart/addAndRemoveCouponCode",
        "tests/functional/cart/addContactLensesToCart",
        "tests/functional/cart/addContactSolutionToCart",
        "tests/functional/cart/changeDoctor",
        "tests/functional/cart/changeQuantityOfItem",
        "tests/functional/cart/removeContactLensesFromCart",
        "tests/functional/cart/reorder",
        "tests/functional/address/addressEditingTest",
        "tests/functional/address/changeDefaultAddress"
    ],

    excludeInstrumentation: /^(?:tests|node_modules)\//
});
