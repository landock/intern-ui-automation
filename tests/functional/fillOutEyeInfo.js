define(function(require) {

    var tdd = require('intern!tdd');
    var assert require('intern/chai!assert');
    var pollUntil = require('intern/dojo/node!leadfoot/helpers/pollUntil');
    var generator = require('../utility/generator');
    var config = require('../config');
    var utils  = require('../utility/functionalTestUtils');
    var Input = require('./elements/input');
    var Promise = require('../../../node_modules/intern/node_modules/dojo/Promise');
    var Product = require('./pages/product');

    tdd.suite('Fill out prescription info', function() {
        var customer, input, productPage;

        tdd.setup(function() {
            customer = generator.getExistingCustomer(config.existingId);
            input = new Input(this.remote);
            productPage = new Product(this.remote);
        });

        tdd.test('set left eye power', function(){
            goToCartPageTests && this.skip('Product in cart');
            return productPage
            .enterPower('-0.50', "left")
            .then(function(txt){
                assert.strictEqual(txt, "-0.50");
            });
        });

        //For now, eye power MUST be -0.50
        tdd.test('set right eye power', function(){
            goToCartPageTests && this.skip('Product in cart');
            return productPage
            .enterPower('-0.50', "right")
            .then(function(txt){
                assert.strictEqual(txt, "-0.50");
            });
        });

        tdd.test('enter BC for left eye', function(){
            goToCartPageTests && this.skip('Product in cart');
            return productPage
            .enterBCSelect("left", "8.4")
            .then(function(txt){
                assert.strictEqual(txt, "8.4");
            });
        });

        tdd.test('enter BC for right eye', function(){
            goToCartPageTests && this.skip('Product in cart');
            return productPage
            .enterBCSelect("right", "8.8")
            .then(function(txt){
                assert.strictEqual(txt, "8.8");
            });
        });

        tdd.test('enter boxes for left eye', function(){
            goToCartPageTests && this.skip('Product in cart');
            return productPage
            .enterBoxesSelect("left", "1")
            .then(function(txt){
                assert.strictEqual(txt, "1");
            });
        });

        tdd.test('enter boxes for right eye', function(){
            goToCartPageTests && this.skip('Product in cart');
            return productPage
            .enterBoxesSelect("right", "1")
            .then(function(txt){
                assert.strictEqual(txt, "1");
            });
        });

        tdd.test('enter input for first name', function(){
            goToCartPageTests && this.skip('Product in cart');
            return input
            .enterInput("#patient-first", customer.firstName)
            .then(function(txt){
                assert.strictEqual(txt, customer.firstName);
            });
        });

        tdd.test('enter input for last name', function(){
            goToCartPageTests && this.skip('Product in cart');
            return input
            .enterInput('#patient-last', customer.lastName)
            .then(function(txt){
                assert.strictEqual(txt, customer.lastName);
            });
        });

        tdd.test('continue to cart', function(){
            goToCartPageTests && this.skip('Product in cart');
            return productPage
            .continueSubmit()
            .then(function(txt){
                assert.strictEqual(txt, config.URL + '/cart');
            });
        });
    });
});
