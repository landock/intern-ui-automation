define([
	'intern!object',
	'../../utility/generator',
	'../../config',
	'../customCommands/BaseCommand',
	'../customCommands/HomeCommand'
],

function (registerSuite, generator, config, BaseCommand, HomeCommand) {
	
	registerSuite (function() {
		var customer;
		var baseCommand;
		var homeCommand;

		return {
			name: 'Sign In',

			setup: function() {
				customer = generator.getExistingCustomer(config.existingId);
				baseCommand = new BaseCommand(this.remote);
				homeCommand = new HomeCommand(this.remote);

				return baseCommand
				.clearCookies()
				.setTimeout('script', 60000)
				.setTimeout('page load', 60000)
				.setFindTimeout(50000)
				.get(config.URL);
			},

			'login from main button': function() {
				return baseCommand.login(customer);
			},

			'logout': function() {
				return baseCommand.navLogout();
			},

			'login from navigation bar': function() {
				return baseCommand.navLogin(customer);
			},

			'logout': function() {
				return baseCommand.navLogout();
			},

			'login from cart in navigation bar': function() {
				return baseCommand.navLoginCart(customer);
			},

			'logout': function() {
				return homeCommand.loginFromHome(customer);
			},

			'logout first time': function() {
				return baseCommand.mobileLogout();
			}
		};
	});
});
