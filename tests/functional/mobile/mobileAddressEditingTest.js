define([
	'intern!object',
	'../../utility/generator',
	'../../config',
	'../customCommands/AllCommands',
	'intern/chai!assert',
	'../../utility/skipRemainingTests'
],

function (registerSuite, generator, config, Command, assert, skip) {
	registerSuite(function() {
		var customer;
		var command;
		var anotherRandomCustomer; //for editing address
		var addressText;

		return {
			name: 'mobile address editing test',

			setup : function() {
				customer = generator.getRandomCustomer();
				anotherRandomCustomer = generator.getRandomCustomer();
				command = new Command(this.remote);

				return command
				.configureNewMobileSession()
				.get(config.URL + '/account');
			},

			beforeEach : function() {
				skip(this);
			},

			'create new account' : function() {
				return command
				.createNewAccount(customer)
				.assertLoggedIn();
			},

			'navigate to account page address tab' : function() {
				return command
				.get(config.URL + '/account')
				.findAndClick(
					'#page-account > div > div.faux-box-over > div.account-tabs.tabs-container.tabs-static > div.tab-nav > div:nth-child(3) > a'
				);
			},

			'add new address' : function() {
				return command
				.findAndClick('a[title="Create New Address"]')
       	 		.fillAddNewAddressForm(customer);
			},

			'store address text' : function() {
				return command
				.findByCssSelector('p[class="no-margin-bottom saved-address"]')
				.getVisibleText()
				.then(function(txt) {
					addressText = txt;
				});
			},

			'edit address' : function() {
				return command
				.findAndClick('a[href*="Address-Edit"]')
				.fillEditAddressForm(anotherRandomCustomer);
			},

			'assert address changed' : function() {
				return command
				.findByCssSelector('p[class="no-margin-bottom saved-address"]')
				.getVisibleText()
				.then(function(txt) {
					assert.notEqual(txt, addressText);
				});
			}
		};
	});
});