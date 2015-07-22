define([
    'intern!object',
    '../../config',
    '../../utility/generator',
    'intern/chai!assert',
    '../customCommands/AllCommands'
],
function (registerSuite, config, generator, assert, Command) {
    registerSuite(function(){
        var customer;
        var command;
        return {
            name: 'customer can log in from cart',
            setup: function() {
                customer = generator.getExistingCustomer(config.existingId);
                command = new Command(this.remote);
                return this.remote
                .clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL + '/lens/acuvue-oasys-24');
            },
            'fill out eye info': function(){
                return command.fillInfo();
            },
            'click continue button from cart': function() {
                return command
                .findAndClick('button[name="dwfrm_cart_checkoutCart"]');
            },
            'click on returning customer sign in button': function() {
                return command
                .findAndClick('a[data-modal-id="modal-sign-in"]');
            },
            'fill out email field': function(){
                return command
                .enterInput('#email-address-modal', customer.email);
            },
            'fill out password field':  function(){
                return command
                .enterInput('#loginPassword', customer.password);
            },
            'submit form': function() {  
                return command
                .findAndClick('#dwfrm_login_login');
            },
            'assert that user is logged in': function() {
                return command
                .findById('logged-in-state');
            }
        };
    });
});
