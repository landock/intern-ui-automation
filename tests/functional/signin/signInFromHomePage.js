define([
    'intern!object',
    '../../utility/generator',
    '../../config',
    '../customCommands/AllCommands',
    '../../utility/skipRemainingTests'
],

function (registerSuite, generator, config, Command, skip) {
	registerSuite(function(){
		var customer;
		var command;

		return {
			name: 'existing customer can sign in from Home Page',
			setup: function() {
				customer = generator.getExistingCustomer(config.existingId);
				command = new Command(this.remote);

				return command
                .configureNewSession(60000)
				.get(config.URL);
			},

			beforeEach: function() {
				skip(this);
			},

			'sign in from main button on homepage' : function() {
				return command
				.findAndClick('a[data-inline-id="inline-sign-in"]')
				.enterInput('#email-address-modal', customer.email)
				.enterInput('#loginPassword', customer.password)
				.findAndClick('#dwfrm_login_login')
                .assertLoggedIn();
			},

			'logout 1' : function() {
				return command
				.logoutFromHeader()
                .assertLoggedOut();
			},

			'sign in from header' : function() {
				return command
				.loginFromHeader(customer)
                .assertLoggedIn();
			},

			'logout 2' : function() {
				return command
				.logoutFromHeader()
                .assertLoggedOut();
			}
		};
	});
});