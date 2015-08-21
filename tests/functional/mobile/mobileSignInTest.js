define([
	'intern!object',
	'../../utility/generator',
	'../../config',
	'../customCommands/AllCommands',
	'../../utility/skipRemainingTests'
],

function (registerSuite, generator, config, AllCommands, skip) {
	registerSuite (function() {
		var customer;
		var command;

		return {
			name: 'Mobile Log In and Log Out',

			setup: function() {
				customer = generator.getExistingCustomer(config.existingId);
				command = new AllCommands(this.remote);

				return command
				.configureNewMobileSession(60000)
				.get(config.URL);
			},

			beforeEach : function() {
				skip(this);
			},

			'login from home button': function() {
				return command.loginFromHome(customer)
				.assertLoggedIn();
			},

			'logout 1': function() {
				return command
				.mobileLogout()
				.assertLoggedOut();
			},

			'login from mobile menu' : function() {
				return command.mobileLogin(customer)
				.waitForDeletedByCssSelector('#modal-sign-in')
				.assertLoggedIn();
			},

			'logout 2' : function() {
				return command
				.mobileLogout()
				.assertLoggedOut();
			}
		};
	});
});