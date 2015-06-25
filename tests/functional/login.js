define([
    'intern!object',
    'intern/chai!assert',
    'intern/dojo/node!leadfoot/helpers/pollUntil',
    '../utility/generator',
    '../config',
    './elements/input',
    '../utility/functionalTestUtils',
    '../../../node_modules/intern/node_modules/dojo/Promise'
],
function (registerSuite, assert, pollUntil, generator, config, Input, utils, Promise) {
    registerSuite(function(){
        var customer;
        var input;
        return {
            name: 'Sign in from account page',
            setup: function(){
                customer = generator.getExistingCustomer(config.existingId);
                input = new Input(this.remote);
                return this.remote
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL + '/account');
            },
            'fill out email field': function(){
                return input
                .enterInput('#email-address', customer.email);
            },
            'fill out password field':  function(){
                return input
                .enterInput('#dwfrm_login_password', customer.password);
            },
            'submit form': function() {
                console.log(this);
                return this.remote
                .findById('dwfrm_login_login')
                .click()
                .end()
                .findByCssSelector('#dwfrm_dashboarditems h3')
                .getVisibleText()
                .then(function(txt) {
                    console.log(txt);
                    assert.include(txt, 'dashboard', 'dashboard page has loaded');
                });
            },
            teardown: function() {
            }
        };
    });
});
