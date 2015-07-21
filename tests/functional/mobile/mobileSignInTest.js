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
				.clearCookies()
				.setTimeout('script', 60000)
				.setTimeout('page load', 60000)
				.setFindTimeout(50000)
				.get(config.URL);
			},

			beforeEach : function() {
				return command
				.removeDemandWareWidget();
			},

			'login from home button': function() {
				return command.loginFromHome(customer);
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
