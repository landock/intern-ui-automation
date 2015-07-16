define([
	'intern!object',
	'../../utility/generator',
	'../../config',
	'intern/dojo/node!leadfoot/helpers/pollUntil',
	'../customCommands/AllCommands',
	'intern/dojo/Promise'
],

function (registerSuite, generator, config, pollUntil, AllCommands, Promise) {
	registerSuite (function() {
		var customer;
		var command;

		// var 'pollAccrossPageLoads' = function(timeout) {
		// 	dfd = new Promise.Deferred();
		// }

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
				.execute(function() {
					$('#__DW__SFToolkit').remove();
				},
				[]);
			},

			// 'login from home button': function() {
			// 	return command.loginFromHome(customer);
			// },

			// 'logout 1': function() {
			// 	return command.mobileLogout();
			// },

			'login from mobile menu' : function() {
				return command.mobileLogin(customer);
				// .sleep(25000);
			},

			'logout 2' : function() {
				return command
				.then(pollUntil(function () {
					var element = document.getElementById('logged-in-state');
					return element === undefined ? null : true;
				}, [], 10000))
				.mobileLogout();
			}
		};
	});
});
