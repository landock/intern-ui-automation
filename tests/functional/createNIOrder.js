define('checkout', [ 'intern!object', 'intern/chai!assert', 'intern/dojo/node!leadfoot/helpers/pollUntil', './pages/home', './pages/product', './pages/cart', './elements/input', './pages/address', './pages/doctor', './pages/paymentInfo', '../utility/generator', '../config',
        '../utility/functionalTestUtils'
        ], function (registerSuite, assert, pollUntil, Home, Product, Cart, Input, Address, Doctor, PaymentInfo, generator, config, utils ) {

            registerSuite(function(){
                var homePage;
                var productPage;
                var cartPage;
                var addressPage;
                var doctorPage;
                var paymentInfoPage;
                var input;
                var command;
                var customer;
                return {
                    name: 'Create NI Order',
                    setup: function(){
                        command = this.remote;
                        homePage = new Home(command);
                        productPage = new Product(command);
                        cartPage = new Cart(command);
                        addressPage = new Address(command);
                        doctorPage = new Doctor(command);
                        paymentInfoPage = new PaymentInfo(command);
                        input = new Input(command);
                        customer = generator.getRandomCustomer();
                        return command 
                            .get(config.URL + '/lens/acuvue-oasys-24')
                            .clearCookies()
                            .setFindTimeout(30000);
                            // .then(pollUntil(utils.elementVisibleByClass, ['fsrCloseBtn'], 60000, 500))
                            // .then(function (val) {
                            //     val.click();
                            // }, function (err) {
                            //     return command;
                            // });
                    },
                    teardown: function() {
                        return command
                            .get(config.URL);
                    },
                    'Set prescription info': {
                        'set left eye power': function(){
                            return productPage
                                .enterPower('-0.50', "left");
                        },
                        'set right eye power': function(){
                            return productPage
                                .enterPower('-0.50', "right");
                        },
                        'enter BC for left eye': function(){
                            return productPage
                                .enterBCSelect("left", "8.4");
                        },
                        'enter BC for right eye': function(){
                            return productPage
                                .enterBCSelect("right", "8.8");
                        },
                        'enter boxes for left eye': function(){
                            return productPage
                                .enterBoxesSelect("left", "1");
                        },
                        'enter boxes for right eye': function(){
                            return productPage
                                .enterBoxesSelect("right", "1");
                        },
                        'enter input for first name': function(){
                            return input
                                .enterInput('#patient-first', customer.firstName);
                        },
                        'enter input for last name': function(){
                            return input
                                .enterInput('#patient-last', customer.lastName);
                        },
                        'continue to cart': function(){
                            return productPage
                                .continueSubmit();
                        },
                        'continue to address': function(){
                            return cartPage
                                .continue();
                        },
                        'check address': function(){
                            return addressPage
                                .checkAddress();
                        }

                    },
                    'fill out address shipping form': function(){
                        return addressPage
                            .fillShippingForm(customer);
                    },
                    'Fill out doctor info': {
                        'continue to doctor': function(){
                            return addressPage
                                .continueToDoctor();
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
                                .continueToReview();
                        },
                        'click first doctor from result': function(){
                            return doctorPage
                                .clickFirstDocResult();
                        }
                    },
                    'Place order': {
                        'enter cc': function(){
                            return paymentInfoPage
                                .inputCreditCard(customer.creditCard)
                                .then(function(number) {
                                    assert.isNumber(number, 'cc number input');
                                }, function(err) {
                                    throw err;
                                });
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
