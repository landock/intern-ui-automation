define([
	'intern!object',
	'../../utility/generator',
	'../../config',
	'../customCommands/AllCommands'
	],

	/*
		This test assumes there is only one address listed.
	*/

	function (registerSuite, generator, config, Command) {
		registerSuite(function() {
			var customer;
			var command;

			var initialDefault;

			return {
				name: 'mobile change default address test',

				setup: function() {
					customer = generator.getExistingCustomer(config.existingId);
					command = new Command(this.remote);

					return command
					.configureNewMobileSession(60000)
					.get(config.URL);
				},

				'login' : function() {
					return command
					.loginFromHome(customer)
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
           	 		.fillAddNewAddressForm(customer);
           	 	},

           	 	'set default address': function() {
           	 		return command
           	 		.findAndClick('div.col-3:nth-child(4) > div:nth-child(1) > p:nth-child(2) > a:nth-child(3)');
           	 	},

           	 	'assert initial default is current default': function() {
           	 		return command
           	 		.assertElementText('p[class="no-margin-bottom saved-address"]', initialDefault);
           	 	},

           	 	'delete created address': function() {
           	 		return command
           	 		.findAndClick('div.col-3:nth-child(4) > div:nth-child(1) > p:nth-child(2) > a:nth-child(2)')
           	 		.refresh();
           	 	},

           	 	'logout': function() {
           	 		return command
           	 		.mobileLogout();
           	 	}
			};
		});
	});