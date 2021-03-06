define([
    'intern!object',
    '../../utility/generator',
    '../../config',
    '../customCommands/AllCommands',
    'intern/chai!assert',
    '../../utility/skipRemainingTests'
],
function (registerSuite, generator, config, AllCommands, assert, skip) {
    registerSuite(function(){
        var customer;
        var command;
        var addressText;
        return {
            name: 'new logged-in customer can edit address',
            setup: function(){
                customer = generator.getRandomCustomer();
                anotherRandomCustomer = generator.getRandomCustomer();
                command = new AllCommands(this.remote);
                return command
                .configureNewSession()
                .get(config.URL + '/account');
            },

            beforeEach: function() {
                skip(this);
            },
            
            'create a new account' : function() {
                return command
				.createNewAccount(customer)
				.assertLoggedIn();
            },

            'navigate to account page' : function() {
                return command.findAndClick('a[title="My Account"]');
            },

            'navigate to account page address tab' : function() {
                return command.findAndClick('div.tab:nth-child(3) > a:nth-child(1)');
            },
            
            'add new address' : function() {
                return command
                .findAndClick('a[href*="Address-Add"]')
                .fillAddNewAddressForm(customer);
            },
            
            'store old address' : function() {
                return command
				.findByCssSelector('p[class="no-margin-bottom saved-address"]')
				.getVisibleText()
				.then(function(txt) {
					addressText = txt;
				});
            },

            'click edit address' : function() {
                return command.findAndClick('a[href*="Address-Edit"]');
            },

            'fill out address form' : function() {
                return command
                .fillEditAddressForm(anotherRandomCustomer);
            },
            
            'assert address changed' : function() {
				return command
				.findByCssSelector('p[class="no-margin-bottom saved-address"]')
				.getVisibleText()
				.then(function(txt) {
					assert.notEqual(txt, addressText);
				});
			},
            'logout' : function(){
                return command
                .logoutFromHeader()
                .assertLoggedOut()
            }
        };
    });
});
