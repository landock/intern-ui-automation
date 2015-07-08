define([

	],

	function() { 
		function AccountPage(remote) {
			this.remote = remote;
		}

		AccountPage.prototype = {
			constructor: AccountPage,

			'login' : function(customer) {
				return this.remote
				.findByCssSelector('#email-address')
				.type(customer.email)
				.end()
				.findByCssSelector('#dwfrm_login_password')
				.type(customer.password)
				.end()
				.findByCssSelector('#dwfrm_login_login')
            	.click()
            	.end()
            	.findById('logged-in-state');
			}
		};
		return AccountPage;
	});