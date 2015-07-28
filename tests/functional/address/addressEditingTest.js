define([
    'intern!object',
    '../utility/generator',
    '../config',
    './customCommands/AllCommands'
],
function (registerSuite, generator, config, AllCommands) {
    registerSuite(function(){
        var customer;
        var command;

        return {
            name: 'Edit Address',
            setup: function(){
                customer = generator.getExistingCustomer(config.existingId);
                command = new AllCommands(this.remote);

                return command
                .configureNewSession(60000)
                .get(config.URL + '/account');
            },

            'login' : function() {
                return command.loginFromHeader(customer);
            },

            'navigate to account page' : function() {
                return command.findAndClick('a[title="My Account"]');
            },

            'navigate to account page address tab' : function() {
                return command.findAndClick('div.tab:nth-child(3) > a:nth-child(1)');
            },

            'click edit address' : function() {
                return command.findAndClick('a[href*="Address-Edit"]');
            },

            'fill out address form' : function() {
                return command.fillEditAddressForm(customer);
            },

            'logout' : function() {
                return command.logoutFromHeader();
            }
        };
    });
});
