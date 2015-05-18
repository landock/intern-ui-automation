define('Create RI Order',
    [
        'intern!object',
        'intern/chai!assert',
        'intern/chai!expect',
        'intern/dojo/node!leadfoot/helpers/pollUntil',
        './pages/home',
        './pages/product',
        './pages/cart',
        './elements/input',
        './pages/address',
        './pages/doctor',
        './pages/paymentInfo',
        '../utility/generator',
        '../config',
        '../utility/functionalTestUtils'
    ], function (registerSuite, assert, expect, pollUntil, Home, Product, Cart, Input, Address, Doctor, PaymentInfo, generator, config, utils) {
        registerSuite(function(){
            var homePage;
            var productPage;
            var cartPage;
            var addressPage;
            var doctorPage;
            var paymentInfoPage;
            var input;
            var that;
            var customer;
            return {
                setup: function(){
                    that = this.remote;

                    homePage = new Home(this.remote);
                    productPage = new Product(this.remote);
                    cartPage = new Cart(this.remote);
                    addressPage = new Address(this.remote);
                    doctorPage = new Doctor(this.remote);
                    paymentInfoPage = new PaymentInfo(this.remote);
                    input = new Input(this.remote);
                    customer = generator.getExistingCustomer(config.existingId);
                },
                'RI Order using Account Hub': {
                    setup: function(){
                        return that
                            .clearCookies()
                            .get(config.URL + '/home/index')
                            .setFindTimeout(25000)
                            .then(pollUntil(utils.elementVisibleByClass, ['fsrCloseBtn'], 10000, 500))
                            .then(function(val){
                                return val.click();
                            }, function(err){
                                return;
                            });
                    },
                    'sign in using flyout': function(){
                        return homePage
                            .signInFlyout(customer)
                            .then(function(text){
                                assert.strictEqual(text, 'Welcome back!');
                            });
                    }
                }
            };
        });
    });
