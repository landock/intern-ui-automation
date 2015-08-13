define([
	'intern!object',
	'../../utility/generator',
	'../../config',
	'../customCommands/AllCommands',
	'intern/chai!assert'
	],

	function (registerSuite, generator, config, Command, assert) {
		registerSuite(function() {
			var customer;
			var anotherRandomCustomer;
			var command;

			var initialDefault;

			return {
				name: 'mobile change default address test',

				setup: function() {
					customer = generator.getRandomCustomer();
					anotherRandomCustomer = generator.getRandomCustomer();
					command = new Command(this.remote);

					return command
					.configureNewMobileSession()
					.get(config.URL + '/account');
				},

				'create new account' : function() {
					return command
					.createNewAccount(customer)
					.assertLoggedIn();
				},

				'navigate to account page' : function() {
					return command
					.findAndClick('#icon-mobile-menu')
					.findAndClick('a[title="My Account"]');
				},

				'navigate to account page address tab' : function() {
					return command
					.findAndClick(
					'#page-account > div > div.faux-box-over > div.account-tabs.tabs-container.tabs-static > div.tab-nav > div:nth-child(3) > a'
					);
				},

				'create a new address': function() {
           	 		return command
           	 		.findAndClick('a[title="Create New Address"]')
           	 		.fillAddNewAddressForm(customer);
           	 	},

				'store initial default': function() {
           	 		return command
           	 		.findByCssSelector('p[class="no-margin-bottom saved-address"]')
           	 		.getVisibleText()
           	 		.then(function(addressText) {
           	 			initialDefault = addressText;
           	 		})
           	 		.end();
           	 	},

           	 	'add a new address': function() {
           	 		return command
           	 		.findAndClick('a[title="Create New Address"]')
           	 		.fillAddNewAddressForm(anotherRandomCustomer);
           	 	},

           	 	'set default address': function() {
           	 		return command
           	 		.findAndClick('div.col-3:nth-child(4) > div:nth-child(1) > p:nth-child(2) > a:nth-child(3)');
           	 	},

           	 	'assert address changed' : function() {
					return command
                    .assertElementText('p[class="no-margin-bottom saved-address"]', initialDefault);
				}
			};
		});
	});