define([
	'intern!object',
	'../../utility/generator',
	'../../config',
	'../customCommands/BaseCommand',
	'../customCommands/HomeCommand'
],

<<<<<<< HEAD
function (registerSuite, generator, config, BaseCommand) {
=======
function (registerSuite, generator, config, BaseCommand, HomeCommand) {
>>>>>>> 033f93d058a660144bbf9640a7a1e79430fa96f6
	registerSuite (function() {
		var customer;
		var baseCommand;
		var homeCommand;

		return {
			name: 'Sign In',
<<<<<<< HEAD
=======

>>>>>>> 033f93d058a660144bbf9640a7a1e79430fa96f6
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
<<<<<<< HEAD
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
				return baseCommand.navLogout();
			}
=======
				return homeCommand.loginFromHome(customer);
			},

			'logout first time': function() {
				return baseCommand.mobileLogout();
			}

			// 'login from navigation bar': function() {
			// 	return baseCommand.navLogin(customer);
			// },

			// 'logout again': function() {
			// 	return baseCommand.navLogout();
			// },

			// 'login from cart in navigation bar': function() {
			// 	return baseCommand.navLoginCart(customer);
			// },

			// 'logout last time': function() {
			// 	return baseCommand.navLogout();
			// }
>>>>>>> 033f93d058a660144bbf9640a7a1e79430fa96f6
		};
	});
});
