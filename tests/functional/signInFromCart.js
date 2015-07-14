define([
    'intern!object',
    '../config',
    '../utility/generator',
    'intern/chai!assert',
    './customCommands/ProductCommand'
],
function (registerSuite, config, generator, assert, command) {
    registerSuite(function(){
        var customer;
        var productCmd;
        return {
            name: 'customer can log in from cart',
            setup: function() {
                customer = generator.getExistingCustomer(config.existingId);
                productCmd = new command(this.remote);
                return this.remote
                .clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL + '/lens/acuvue-oasys-24')
            },
            'fill out eye info': function(){
                return productCmd.fillInfo();
            },
            'click continue button from cart': function() {
                return productCmd
                .findAndClick('button[name="dwfrm_cart_checkoutCart"]');
            },
            'click on returning customer sign in button': function() {
                return productCmd
                .findAndClick('a[data-modal-id="modal-sign-in"]');
            },
            'fill out email field': function(){
                return productCmd
                .enterInput('#email-address-modal', customer.email);
            },
            'fill out password field':  function(){
                return productCmd
                .enterInput('#loginPassword', customer.password);
            },
            'submit form': function() {  
                return productCmd
                .findAndClick('#dwfrm_login_login')
                .end()
                .getCurrentUrl()
                .then(function(url){
                    assert.include(url, 'cart');
                });
            }
        }
    });
});
