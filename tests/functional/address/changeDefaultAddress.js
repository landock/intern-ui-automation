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
				name: 'Change default address test',

				setup: function() {
					customer = generator.getExistingCustomer(config.existingId);
					command = new Command(this.remote);

					return command
                    .configureNewSession(60000)
					.get(config.URL);
				},

				'login': function() {
					return command.loginFromHome(customer);
				},

				'navigate to account page': function() {
               		return command.findAndClick('a[title="My Account"]');
            	},

            	'navigate to account page address tab': function() {
                	return command.findAndClick('div.tab:nth-child(3) > a:nth-child(1)');
           	 	},

           	 	// each address entry has a unique ID in each href url
           	 	// probably should store and compare that
           	 	// instead of the raw text of the address
           	 	'store initial default': function() {
           	 		return command
           	 		.findByCssSelector('p[class="no-margin-bottom saved-address"]')
           	 		.getVisibleText()
           	 		.then(function(addressText) {
           	 			initialDefault = addressText;
           	 		})
           	 		.end();
           	 	},

           	 	// new address automatically becomes the default
           	 	'add a new address': function() {
           	 		return command
           	 		.findAndClick('a[title="Create New Address"]')
           	 		.fillAddNewAddressForm(customer);
           	 	},

           	 	// set initial default address back to default
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
           	 		.logoutFromHeader();
           	 	}
			 };
		});
	});