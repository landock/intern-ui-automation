define('checkout',
        [
        'intern!object',
        'intern/chai!assert',
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
        '../utility/functionalTestUtils',
        'intern/dojo/node!leadfoot/helpers/pollUntil'
        ], function (registerSuite, assert, pollUntil, Home, Product, Cart, Input, Address, Doctor, PaymentInfo, generator, config, utils, pollUntil) {

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
                    name: 'Create NI Order',
                    setup: function(){
                        that = this.remote;
                        homePage = new Home(this.remote);
                        productPage = new Product(this.remote);
                        cartPage = new Cart(this.remote);
                        addressPage = new Address(this.remote);
                        doctorPage = new Doctor(this.remote);
                        paymentInfoPage = new PaymentInfo(this.remote);
                        input = new Input(this.remote);
                        customer = generator.getRandomCustomer();
                    },
                    'Create NI Order': {
                        setup: function(){
                            return that
                                .get(config.URL + '/lens/acuvue-oasys-24')
                                .clearCookies()
                                .then(pollUntil(utils.elementVisibleByClass, ['fsrCloseBtn'], 20000, 500))
                                .then(function (val) {
                                    val.click();
                                }, function (err) {
                                    throw new Error(err);
                                });
                        },
                        teardown: function() {
                            return that
                                .get(config.URL + '/lens/acuvue-oasys-24')
                                .clearCookies()
                        },
                        'set left eye power': function(){
                            return productPage
                                .enterPower('-0.50', "left")
                                .then(function(txt){
                                    assert.strictEqual(txt, "-0.50");
                                });
                        },
                        'set right eye power': function(){
                            return productPage
                                .enterPower('-0.50', "right")
                                .then(function(txt){
                                    assert.strictEqual(txt, "-0.50");
                                });
                        },
                        'enter BC for left eye': function(){
                            return productPage
                                .enterBCSelect("left", "8.4")
                                .then(function(txt){
                                    assert.strictEqual(txt, "8.4");
                                });
                        },
                        'enter BC for right eye': function(){
                            return productPage
                                .enterBCSelect("right", "8.8")
                                .then(function(txt){
                                    assert.strictEqual(txt, "8.8");
                                });
                        },
                        'enter boxes for left eye': function(){
                            return productPage
                                .enterBoxesSelect("left", "1")
                                .then(function(txt){
                                    assert.strictEqual(txt, "1");
                                });
                        },
                        'enter boxes for right eye': function(){
                            return productPage
                                .enterBoxesSelect("right", "1")
                                .then(function(txt){
                                    assert.strictEqual(txt, "1");
                                });
                        },
                        'enter input for first name': function(){
                            return input
                                .enterInput('#patient-first', customer.firstName)
                                .then(function(txt){
                                    assert.strictEqual(txt, customer.firstName);
                                });
                        },
                        'enter input for last name': function(){
                            return input
                                .enterInput('#patient-last', customer.lastName)
                                .then(function(txt){
                                    assert.strictEqual(txt, customer.lastName);
                                });
                        },
                        'continue to cart': function(){
                            return productPage
                                .continueSubmit()
                                .then(function(url){
                                    assert.strictEqual(url, config.URL + '/cart');
                                });
                        },
                        'continue to address': function(){
                            return cartPage
                                .continue();
                        },
                        'check address': function(){
                            return addressPage
                                .checkAddress()
                                .then(function(txt){
                                    assert.include(txt, 'Address Information');
                                });
                        },
                        'fill out address shipping form': function(){
                            return addressPage
                                .fillShippingForm(customer);
                        },
                        'continue to doctor': function(){
                            return addressPage
                                .continueToDoctor();
                        },
                        'enter doctor name': function(){
                            return doctorPage
                                .enterDoctor(customer.doctor)
                                .then(function(name){
                                    assert.strictEqual(name, customer.doctor);
                                });
                        },
                        'select doctor state': function(){
                            return doctorPage
                                .selectState(customer.doctor_state);
                        },
                        'continue to review': function(){
                            return doctorPage
                                .continueToReview()
                                .then(function(header){
                                    // need to implement
                                });
                        },
                        'click first doctor from result': function(){
                            return doctorPage
                                .clickFirstDocResult();
                        },
                        'enter cc': function(){
                            return paymentInfoPage
                                .inputCreditCard(customer.creditCard);
                        },
                        'enter name for cc': function(){
                            return paymentInfoPage
                                .inputName(customer);
                        },
                        'place order': function(){
                            return paymentInfoPage
                                .placeOrder();
                        }
                    }
                };
            });
        });
