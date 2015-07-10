define([
	'intern!object',
	'./pages/header',
	'../config',
	'../utility/generator'
],

function (registerSuite, Header, config, generator) {
	registerSuite(function () {
		var header;
		var customer;
		
		return {
			name: 'test header login',
			setup: function() {
				header = new Header(this.remote);
				customer = generator.getExistingCustomer(config.existingId);
				return this.remote
				.clearCookies()
				.setTimeout('script', 60000)
				.setTimeout('page load',60000)
				.setFindTimeout(50000)
				.get(config.URL);
			},

			'test login' : function() {
				return header.login(customer);
			},

			'test logout' : function() {
				return header.logout();
			}
		};
	});
});