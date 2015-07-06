define([
    'intern!object',
    '../config',
    '../utility/generator',
    './elements/input',
    'intern/chai!assert'
],
function (registerSuite, config, generator, input, assert) {
    registerSuite(function(){
        var customer;
        var inputComponent;
        return {
            name: 'customer can log in from cart',
            setup: function() {
                customer = generator.getExistingCustomer(config.existingId);
                inputComponent = new input(this.remote);
                return this.remote
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
            },
            'click contine button from cart': function() {
                return this.remote
                .findByCssSelector('button[name="dwfrm_cart_checkoutCart"]')
                .click();
            },
            'click on returning customer sign in button': function() {
                return this.remote
                .findByCssSelector('a[data-modal-id="modal-sign-in"]')
                .click();
            },
            'fill out email field': function(){
                return inputComponent
                .enterInput('#email-address-modal', customer.email);
            },
            'fill out password field':  function(){
                return inputComponent
                .enterInput('#loginPassword', customer.password);
            },
            'submit form': function() {  
                return this.remote
                .findById('dwfrm_login_login')
                .click()
                .end()
                .getCurrentUrl()
                .then(function(url){
                    assert.include(url, 'cart');
                });
            }
        }
    });
});
