define([
    'intern!object',
    '../config',
    'intern/chai!assert',
    '../utility/generator',
    './elements/input',
    './pages/product'
],

function (registerSuite, config, assert, generator, Input, Product) {

    registerSuite(function(){
        var customer, input, productPage;
        return {
            name: 'Fill out prescription info',
            setup: function(){
                customer = generator.getExistingCustomer(config.existingId);
                input = new Input(this.remote);
                productPage = new Product(this.remote);
				return this.remote
                    .setTimeout('script', 60000)
                    .setTimeout('page load', 60000)
                    .setFindTimeout(50000)
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

            //For now, eye power MUST be -0.50
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
        };
    });
});
