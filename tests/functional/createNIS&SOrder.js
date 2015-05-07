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
        '../config',
        'intern/dojo/node!leadfoot/helpers/pollUntil'
    ], function (registerSuite, assert, expect, Home, Product, Cart, Input, Address, Doctor, PaymentInfo, generator, config, pollUntil) {

        function visibleByQSA(selector, timeout) {
            timeout = timeout || 10000;

            return pollUntil(function (selector) {
                /* global document */
                var match = document.querySelectorAll(selector);

                if (match.length > 1) {
                    throw new Error('Multiple elements matched. Make a more precise selector');
                }

                return match[0] && match[0].offsetWidth > 0 ? true : null;
            }, [ selector ], timeout);
        }

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
                    customer = generator.getRandomCustomer();
                },
                'Create NI Submit&Skip Order': {
                    setup: function(){

                        //var x =

                       return that
                           .clearCookies()
                           .get(config.URL + '/lens/acuvue-oasys-24')
                           .findByCssSelector('.fsrCloseBtn')
                           .then(visibleByQSA('.fsrCloseBtn', 20000))
                           .setFindTimeout(14000)
                           .findByCssSelector('.fsrCloseBtngit status')
                           .then(function(val){
                               return val.click();
                           }, function(err){
                               return;
                           });

                    },
                    'upload picture': function(){
                      return productPage
                          .uploadPicture()
                          .then(function(foundPic){
                              assert.strictEqual(foundPic, true);
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
                            .then(function(txt){
                                assert.strictEqual(txt, config.URL + '/cart');
                            });
                    },
                    'continue to address': function(){
                        return cartPage
                            .continueToAddress()
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
                            .continueToDoctor()
                            .then(function(header){
                                assert.include(header, 'Eye Doctor');
                            });
                    },
                    'enter doctor name': function(){
                        return doctorPage
                            .enterDoctor(customer.doctor);
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
            }
        });
    });