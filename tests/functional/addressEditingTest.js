define([
    'intern!object',
    '../utility/generator',
    '../config',
    './customCommands/addressCommand'
],
function (registerSuite, generator, config, AddressCommand) {
    registerSuite(function(){
        var customer;
        var addressCommand;

        return {
            name: 'Edit Address',
            setup: function(){
                customer = generator.getExistingCustomer(config.existingId);
                addressCommand = new AddressCommand(this.remote);

                return this.remote
                .clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL + '/account');
            },

            'login' : function() {
                return addressCommand.login(customer);
            },

            'navigate to account page' : function() {
                return addressCommand.findAndClick('a[title="My Account"]');
            },

            'navigate to account page address tab' : function() {
                return addressCommand.findAndClick('a[href$="1800contacts/address-list"]');
            },

            'click address edit' : function() {
                return addressCommand.findAndClick('a[href*="Address-Edit"]');
            },

            'fill out address form' : function() {
                return addressCommand.fillAddressForm(customer)
                .sleep(5000);
            }

        };
    });
});
