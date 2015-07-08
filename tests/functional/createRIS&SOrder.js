define('checkout',
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
                var customer;
                return {
                    setup: function(){

                        homePage = new Home(this.remote);
                        productPage = new Product(this.remote);
                        cartPage = new Cart(this.remote);
                        addressPage = new Address(this.remote);
                        doctorPage = new Doctor(this.remote);
                        paymentInfoPage = new PaymentInfo(this.remote);
                        input = new Input(this.remote);
                        customer = generator.getExistingCustomer(config.existingId);
                    },
                    'Create RI Submit&Skip Order': {
                        setup: function(){
                            return this.remote
                                .clearCookies()
                                .get(config.URL + '/lens/acuvue-oasys-24')
                                .setFindTimeout(10000)
                                .then(pollUntil(utils.elementVisibleByClass, ['fsrCloseBtn'], 20000, 500))
                                .then(function(val){
                                    return val.click();
                                }, function(err){
                                    return;
                                });
                        },
                        'upload picture': function(){
                            return productPage
                                .uploadPicture()
                                // 
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
                                    assert.strictEqual(val, customer.password)
                                });
                        },
                        'submit form': function(){
                            return addressPage
                                .submitModalForm()
                                .then(function(header){

                                    expect(header).to.be.ok;
                                    if(header === 'Find Test TestAcct\'s Eye Doctor'){
                                        this.remote.findByCssSelector('.btn-orange')
                                            .click()
                                            .sleep(3000)
                                            .end();
                                    }
                                    //assert.strictEqual(header, 'Find Test TestAcct\'s Eye Doctor');
                                });
                        },
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
                        //'enter doctor name': function(){
                        //    return doctorPage
                        //        .enterDoctor(customer.doctor);
                        //},
                        //'select doctor state': function(){
                        //    return doctorPage
                        //        .selectState(customer.doctor_state);
                        //},
                        //'continue to review': function(){
                        //    return doctorPage
                        //        .continueToReview()
                        //        .then(function(header){
                        //            // need to implement
                        //        });
                        //},
                        //'click first doctor from result': function(){
                        //    return doctorPage
                        //        .clickFirstDocResult();
                        //},
                        //'enter cc': function(){
                        //    return paymentInfoPage
                        //        .inputCreditCard(customer.creditCard);
                        //},
                        //'enter name for cc': function(){
                        //    return paymentInfoPage
                        //        .inputName(customer);
                        //},
                        //'place order': function(){
                        //    return paymentInfoPage
                        //        .placeOrder();
                        //}
                    }
                }
            });
        });
