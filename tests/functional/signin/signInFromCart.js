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
            name: 'existing customer can log in from cart',
            setup: function() {
                customer = generator.getExistingCustomer(config.existingId);
                command = new Command(this.remote);
                return command
                .configureNewSession(60000)
                .get(config.URL + '/lens/acuvue-oasys-24');
            },
            'fill out eye info': function(){
                return command.fillInfo();
            },
            'click continue button from cart': function() {
                return command
                .findAndClick('button[name="dwfrm_cart_checkoutCart"]');
            },
            'sign in from cart' : function(){
                return command
                .signInFromCart(customer)
            },
            'assert that user is logged in': function() {
                return command
                .findById('logged-in-state');
            },
            'logout' : function(){
                return command
                .logoutFromHeader()
                .assertLoggedOut()
            }
        };
    });
});
