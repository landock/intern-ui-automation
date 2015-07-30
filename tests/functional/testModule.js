define([
    '../utility/generator',
    '../config',
    './customCommands/AllCommands'
],
function(generator, config, Command) {
    return {
        name: 'Sign in from Home Page',
        setup: function() {
            customer = generator.getExistingCustomer(config.existingId);
            command = new Command(this.remote);

            return command
            .configureNewSession(60000)
            .get(config.URL);
        },

        'sign in from main button on homepage' : function() {
            return command
            .findAndClick('a[data-inline-id="inline-sign-in"]')
            .enterInput('#email-address-modal', customer.email)
            .enterInput('#loginPassword', customer.password)
            .findAndClick('#dwfrm_login_login');
        },

        'logout 1' : function() {
            return command
            .logoutFromHeader();
        },

        'sign in from header' : function() {
            return command
            .loginFromHeader(customer);
        },

        'logout 2' : function() {
            return command
            .logoutFromHeader();
        }
    };
});
