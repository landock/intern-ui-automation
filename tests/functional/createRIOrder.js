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
           './pages/accountPage',
           '../utility/generator',
           '../config',
           '../utility/functionalTestUtils',
           '../../../node_modules/intern/node_modules/dojo/Promise'
       ],
       function (registerSuite, assert, expect, pollUntil, Home, Product, Cart, Input, Address, Doctor, PaymentInfo, AccountPage, generator, config, utils, Promise) {
           registerSuite(function(){
               var homePage;
               var productPage;
               var cartPage;
               var addressPage;
               var doctorPage;
               var paymentInfoPage;
               var accountPage;
               var input;
               var customer;
               var goToCartPageTests;
               return {
                   name: 'Create RI Order',
                   setup: function(){
                       homePage = new Home(this.remote);
                       productPage = new Product(this.remote);
                       cartPage = new Cart(this.remote);
                       addressPage = new Address(this.remote);
                       doctorPage = new Doctor(this.remote);
                       paymentInfoPage = new PaymentInfo(this.remote);
                       accountPage = new AccountPage(this.remote);
                       input = new Input(this.remote);
                       customer = generator.getExistingCustomer(config.existingId);

                       return this.remote
                       .clearCookies()
                       .setTimeout('script', 60000)
                       .setTimeout('page load', 120000)
                       .setFindTimeout(40000);
                   },
                   'Sign into Account': {

                       setup: function() {
                           return this.remote
                                .get(config.URL + '/account');
                       },

                       'login': function() {
                            return accountPage.login(customer);
                       }

                       // 'fill out form': function(){
                       //     var thatRemote = this.remote;
                       //     return Promise.all([
                       //         input.enterInput('#email-address', customer.email),
                       //         input.enterInput('#dwfrm_login_password', customer.password)
                       //     ])
                       //     .then(function() {
                       //         return thatRemote
                       //         .findById('dwfrm_login_login')
                       //         .click()
                       //         .end()
                       //         .then(pollUntil(function() {
                       //             var isCartPage = null;
                       //             return isCartPage = $('.a41-sub-steps .active').length === 1  ? 'true' : 'false';
                       //         }, 20000, 500))
                       //         .then(function(isCartPage) {
                       //             console.log(isCartPage);
                       //             if (isCartPage === 'true') {
                       //                 goToCartPageTests = true;
                       //             }
                       //         });
                       //     });
                       // }
                   },

                   'Fill out prescription info': {
                       'setup' : function() {
                            return this.remote
                                .get(config.URL + '/lens/acuvue-oasys-24');
                       },
                       //For now, eye power MUST be -0.50
                       'set left eye power': function(){
                           goToCartPageTests && this.skip('Product in cart');
                           return productPage
                           .enterPower('-0.50', "left")
                           .then(function(txt){
                               assert.strictEqual(txt, "-0.50");
                           });
                       },
                       'set right eye power': function(){
                           goToCartPageTests && this.skip('Product in cart');
                           return productPage
                           .enterPower('-0.50', "right")
                           .then(function(txt){
                               assert.strictEqual(txt, "-0.50");
                           });
                       },
                       'enter BC for left eye': function(){
                           goToCartPageTests && this.skip('Product in cart');
                           return productPage
                           .enterBCSelect("left", "8.4")
                           .then(function(txt){
                               assert.strictEqual(txt, "8.4");
                           });
                       },
                       'enter BC for right eye': function(){
                           goToCartPageTests && this.skip('Product in cart');
                           return productPage
                           .enterBCSelect("right", "8.8")
                           .then(function(txt){
                               assert.strictEqual(txt, "8.8");
                           });
                       },
                       'enter boxes for left eye': function(){
                           goToCartPageTests && this.skip('Product in cart');
                           return productPage
                           .enterBoxesSelect("left", "1")
                           .then(function(txt){
                               assert.strictEqual(txt, "1");
                           });
                       },
                       'enter boxes for right eye': function(){
                           goToCartPageTests && this.skip('Product in cart');
                           return productPage
                           .enterBoxesSelect("right", "1")
                           .then(function(txt){
                               assert.strictEqual(txt, "1");
                           });
                       },
                       'enter input for first name': function(){
                           goToCartPageTests && this.skip('Product in cart');
                           return input
                           .enterInput("#patient-first", customer.firstName)
                           .then(function(txt){
                               assert.strictEqual(txt, customer.firstName);
                           });
                       },
                       'enter input for last name': function(){
                           goToCartPageTests && this.skip('Product in cart');
                           return input
                           .enterInput('#patient-last', customer.lastName)
                           .then(function(txt){
                               assert.strictEqual(txt, customer.lastName);
                           });
                       },
                       'continue to cart': function(){
                           goToCartPageTests && this.skip('Product in cart');
                           return productPage
                           .continueSubmit()
                           .then(function(txt){
                               assert.strictEqual(txt, config.URL + '/cart');
                           });
                       }
                   },
                   'continue to doctor': function(){
                       return cartPage
                       .continue();
                   },
                   'select eye doctor': function(){
                     var thatRemote = this.remote;
                     return this.remote
                       .findByCssSelector('a[href="ajax-doctor-results.html"]')
                       .isDisplayed()
                       .then(function(displayed) {
                           if(displayed) {
                             return Promise.all([
                                 doctorPage.selectState(customer.doctor_state),
                                 doctorPage.enterDoctor(customer.doctor)
                             ])
                             .then(function() {
                               return doctorPage.continueToReview();
                             });
                           } else {
                               return doctorPage
                               .clickFirstDocResult();
                           }
                       });
                   },
                   // CHECK command THE PLACE ORDER IS FUNCTIONING AND NOT TIMING OUT
                   'place order': function(){
                       return paymentInfoPage
                       .placeOrder();
                   }
               };
           });
       });
