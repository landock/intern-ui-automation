define([
    'intern!object',
    '../config',
    '../utility/generator',
    './elements/input',
    'intern/chai!assert'
],
function (registerSuite, config, assert) {
    registerSuite(function(){
        var customer;
        return {
            name: 'customer can log in from cart',
            setup: function() {
                customer = generator.getExistingCustomer(config.existingId);
                return this.remote
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL);
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
                return input
                .enterInput('#email-address-modal', customer.email);
            },
            'fill out password field':  function(){
                return input
                .enterInput('#loginPassword', customer.password);
            },
            'submit form': function() {
                console.log(this);
                return this.remote
                .findById('dwfrm_login_login')
                .click()
                .end()
                //TODO: assert or verify that sign in was successful
                .findByCssSelector('#dwfrm_dashboarditems h3')
                .getVisibleText()
                .then(function(txt) {
                    console.log(txt);
                    assert.include(txt, 'dashboard', 'dashboard page has loaded');
                });
            },
        }
    });
});
