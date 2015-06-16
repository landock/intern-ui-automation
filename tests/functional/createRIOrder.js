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
                var command;
                var customer;
                return {
                    name: 'Create RI Order',
                    setup: function(){
                        command = this.remote;
                        homePage = new Home(command);
                        productPage = new Product(command);
                        cartPage = new Cart(command);
                        addressPage = new Address(command);
                        doctorPage = new Doctor(command);
                        paymentInfoPage = new PaymentInfo(command);
                        input = new Input(command);
                        customer = generator.getExistingCustomer(config.existingId);

                        return command
                            .get(config.URL + '/lens/acuvue-oasys-24')
                            .clearCookies()
                            .setFindTimeout(60000);
                        // .then(pollUntil(utils.elementVisibleByClass, ['fsrCloseBtn'], 60000, 500))
                        // .then(function(val){
                        //     return val.click();
                        // }, function(err){
                        //     return;
                        // });
                    },
                    'Fill out prescription info': {
                        //For now, eye power MUST be -0.50
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
                                .enterInput("#patient-first", customer.firstName)
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
                        }
                    },
                    'Fill out Address': {
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
                        'click sign in btn': function(){
                            return addressPage
                                .signIn();
                        },
                        'enter email': function(){
                            return addressPage
                                .enterEmail(customer.email)
                                .then(function(val){
                                    assert.strictEqual(val, customer.email);
                                });
                        },
                        'enter pass': function(){
                            return addressPage
                                .enterPass(customer.password)
                                .then(function(val){
                                    assert.strictEqual(val, customer.password);
                                });
                        },
                        'submit form': function(){
                            return addressPage
                                .submitModalForm()
                                .then(function(header){
                                    expect(header).to.be.ok;
                                    if(header === 'Find Test TestAcct\'s Eye Doctor'){
                                        command.findByCssSelector('.btn-orange')
                                            .click()
                                            .then(pollUntil(utils.elementVisibleByClass, ['search-doctor-results'], 60000))
                                            .then(function(ele){
                                                return true;
                                            }, function(error){
                                                return false;
                                            });
                                    }
                                    //assert.strictEqual(header, 'Find Test TestAcct\'s Eye Doctor');
                                });
                        }
                    },
                    'select eye doctor': function(){
                        return doctorPage
                            .clickFirstDocResult();
                    },
                    // CHECK command THE PLACE ORDER IS FUNCTIONINGIN AND NOT TIMEING OUT
                    'place order': function(){
                        return paymentInfoPage
                            .placeOrder()
                            .sleep(3000)
                            .findByCssSelector('.thankyou-msg')
                            .getVisibleText()
                            .then(function(txt){
                                assert.strictEqual(txt, 'Thank you for your order');
                            });
                    }
                };
            });
        });
