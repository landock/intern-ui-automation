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
			},

			'clickAccountAddressTab' : function() {
				return this.remote
				.findByXpath('//*[@id="page-account"]/div/div[2]/div[1]/div[3]/a')
				.click()
				.end()
			},

			'editAddress' : function() {
				return this.remote
				.findByXpath('//*[@id="page-account"]/div/div[2]/div[2]/div/div[1]/div[2]/div/p[2]/a[1]')
				.click()
				.end()
			},

			'clearAddressField' : function(id) {
				return this.remote
				.findById(id)
				.clearValue();
			},

			'fillAddressField' : function(string, id) {
				return this.remote
				.findById(id)
				.type(string)
				.end()
			},

			'saveAddressForm' : function() {
				return this.remote
				.findByName('dwfrm_profile_address_edit')
				.click()
				.end()
				.sleep(10000);
			}

		};
		return AccountPage;
	});