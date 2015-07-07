define('checkout', [
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
        '../utility/functionalTestUtils',
        '../config',
], function (registerSuite, assert, expect, pollUntil, Home, Product, Cart, Input, Address, Doctor, PaymentInfo, generator,  utils, config ) {

    registerSuite(function () {
        var homePage;
        var productPage;
        var cartPage;
        var addressPage;
        var doctorPage;
        var paymentInfoPage;
        var input;
        var customer;
        return {
            name: 'Create NI Submit and Skip Order',
            setup: function () {
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
                setup: function () {
                    return this.remote
                        .get(config.URL + '/lens/acuvue-oasys-24')
                        .clearCookies();
                        //.setFindTimeout(14000)
                        //.then(pollUntil('return document.getElementsByClass("fsrCloseBtn")[0];', 20000, 700))
                        // .then(pollUntil(utils.elementVisibleByClass, ['fsrCloseBtn'], 20000, 700))
                        // .then(function (val) {
                            // return val.click();
                        // }, function (err) {
                            // return;
                        // });
                },
                'upload picture': function () {
                    return productPage
                        .uploadPicture()
                        .then(function (foundPic) {
                            assert.strictEqual(foundPic, true);
                        });
                },
                'enter input for first name': function () {
                    return input
                        .enterInput('#patient-first', customer.firstName)
                        .then(function (txt) {
                            assert.strictEqual(txt, customer.firstName);
                        });
                },
                'enter input for last name': function () {
                    return input
                        .enterInput('#patient-last', customer.lastName)
                        .then(function (txt) {
                            assert.strictEqual(txt, customer.lastName);
                        });
                },
                'continue to cart': function () {
                    return productPage
                        .continueSubmit()
                        .then(function (txt) {
                            assert.strictEqual(txt, config.URL + '/cart');
                        });
                },
                'continue to address': function () {
                    return cartPage
                        .continueToAddress()
                        .then(function (txt) {
                            assert.include(txt, 'Address Information');
                        });
                },
                'fill out address shipping form': function () {
                    return addressPage
                        .fillShippingForm(customer);
                },
                'continue to paymentInfo': function () {
                    return addressPage
                        .continueToDoctor(); // needs to be renamed
                },
                'enter cc': function () {
                    return paymentInfoPage
                        .inputCreditCard(customer.creditCard);
                },
                'enter name for cc': function () {
                    return paymentInfoPage
                        .inputName(customer);
                },
                'place order': function () {
                    return paymentInfoPage
                        .placeOrder();
                }
            }
        };
    });
});
