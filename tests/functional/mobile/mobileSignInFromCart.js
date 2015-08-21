define([
    'intern!object',
    '../../config',
    '../../utility/generator',
    'intern/chai!assert',
    '../customCommands/AllCommands',
    '../../utility/skipRemainingTests'
],
function (registerSuite, config, generator, assert, Command, skip) {
    registerSuite(function(){
        var customer;
        var command;
        return {
            name: 'customer can log in from cart',
            setup: function() {
                customer = generator.getExistingCustomer(config.existingId);
                command = new Command(this.remote);
                return command
                .configureNewMobileSession(60000)
                .get(config.URL + '/lens/acuvue-oasys-24');
            },

            beforeEach : function() {
                skip(this);
            },

            'click enter Rx manually button': function() {
                return command
                .findAndClick('#enterManuallyButton');
            },

            'fill out eye info': function(){
                return command
                .mobileFillInfo();
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
                .assertLoggedIn();  
            }
        };
    });
});
