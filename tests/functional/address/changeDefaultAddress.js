define([
	'intern!object',
	'../../utility/generator',
	'../../config',
	'../customCommands/AllCommands'
	],
	
	function (registerSuite, generator, config, Command) {
		registerSuite(function() {
			var customer;
			var command;

			return {
				name: 'Change default address test',

				setup: function() {
					customer = generator.getExistingCustomer(config.existingId);
					command = new Command(this.remote);

					return command
					.clearCookies()
					.setTimeout('script', 60000)
					.setTimeout('page load', 60000)
					.setFindTimeout(50000)
					.get(config.URL);
				},

				beforeEach: function() {
					return command.removeDemandWareWidget();
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

           	 	'add a new address': function() {
           	 		return command
           	 		.findByCssSelector('p[class="no-margin-bottom saved-address"]')
           	 		.getVisibleText()
           	 		.then(function(text) {
           	 			console.log(text);
           	 		})
           	 		.end()
           	 		.findAndClick('a[title="Create New Address"]')
           	 		.fillAddNewAddressForm(customer);
           	 	},

           	 	'set default address': function() {
           	 		return command
           	 	}
			};
		});
	});