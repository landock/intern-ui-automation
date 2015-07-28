define([
	'intern!object',
	'../../utility/generator',
	'../../config',
	'../customCommands/AllCommands'
],

function (registerSuite, generator, config, AllCommands) {
	registerSuite (function() {
		var customer;
		var command;

		return {
			name: 'Mobile Log In and Log Out',

			setup: function() {
				customer = generator.getExistingCustomer(config.existingId);
				command = new AllCommands(this.remote);

				return command
				.configureNewSession(60000)
				.mobileGet(config.URL);
				// .removeDemandWareWidget();
			},

			'login from home button': function() {
				return command.loginFromHome(customer)
				.assertLoggedIn()
				.removeDemandWareWidget();
			},

			'logout 1': function() {
				return command.mobileLogout();
			},

			'login from mobile menu' : function() {
				return command.mobileLogin(customer)
				.waitForDeletedByCssSelector('#modal-sign-in');
			},

			'logout 2' : function() {
				return command
				.mobileLogout();
			}
		};
	});
});
