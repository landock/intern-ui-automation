define([
	'intern!object',
	'./pages/header',
	'../config'
],

function (registerSuite, Header, config) {
	registerSuite(function () {
		var header;
		return {
			name: 'test header login',
			setup: function() {
				header = new Header(this.remote);
				return this.remote
				.clearCookies()
				.setTimeout('script', 60000)
				.setTimeout('page load',60000)
				.setFindTimeout(50000)
				.get(config.URL);
			},

			'test login' : function() {
				return header.login();
			},

			'test logout' : function() {
				return header.logout();
			}
		};
	});
});