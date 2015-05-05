define('checkout',
    [
        'intern!object',
        'intern/chai!assert',
        'intern/chai!expect',
        './pages/home',
        './pages/product',
        './pages/cart',
        './elements/input',
        './pages/address',
        './pages/doctor',
        './pages/paymentInfo',
        '../utility/generator',
        '../config'
    ], function (registerSuite, assert, expect, Home, Product, Cart, Input, Address, Doctor, PaymentInfo, generator, config) {
        registerSuite(function(){
            var homePage;
            var productPage;
            var cartPage;
            var addressPage;
            var doctorPage;
            var paymentInfoPage;
            var inputEl;
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
                    inputEl = new Input(this.remote);
                    customer = generator.getExistingCustomer(0);
                },
                'test add product': {
                    setup: function(){
                        return that
                            .get(config.URL + '/lens/acuvue-oasys-24')
                            .sleep(3000)
                            .findByCssSelector('.fsrCloseBtn')
                            .click();
                    },
                    'upload picture': function(){
                      return productPage
                          .uploadPicture()
                          .then(function(foundPic){
                              assert.strictEqual(foundPic, true);
                          });
                    }
                }
            }
        });
    });