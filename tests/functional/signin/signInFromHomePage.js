define([
    'intern!object',
    '../../utility/generator',
    '../../config',
    '../customCommands/AllCommands'
],

function (registerSuite, generator, config, Command) {
	registerSuite(function(){
		var customer;
		var command;

		return {
			name: 'Sign in from Home Page',
			setup: function() {
				customer = generator.getExistingCustomer(config.existingId);
				command = new Command(this.remote);

				return this.remote
				.clearCookies()
				.setTimeout('script', 60000)
				.setTimeout('page load', 60000)
				.setFindTimeout(50000)
				.get(config.URL);
			},

			'sign in from main button on homepage' : function() {
				return command
				.findAndClick('a[data-inline-id="inline-sign-in"]')
				.enterInput('#email-address-modal', customer.email)
				.enterInput('#loginPassword', customer.password)
				.findAndClick('#dwfrm_login_login');
			},

			'logout 1' : function() {
				return command
				.logoutFromHeader();
			},

			'sign in from header' : function() {
				return command
				.loginFromHeader(customer);
			},

			'logout 2' : function() {
				return command
				.logoutFromHeader();
			}
		};
	});
});