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
			name: 'mobile address editing test',

			setup : function() {
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

			'click edit address' : function() {
				return command.findAndClick('a[href*="Address-Edit"]');
			},

			'fill out address form' : function() {
				return command.fillEditAddressForm(customer);
			}
		};
	});
});