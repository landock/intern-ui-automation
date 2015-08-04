define([
	'intern!object',
	'../../config',
	'../../utility/generator',
	'../customCommands/AllCommands'
	],

	function (regesterSuite, config, generator, Command) {
		regesterSuite(function() {

			var command; 
			var customer;
			var payPalInfo;

			return {
				name : 'mobile checkout with paypal',

				setup : function() {
					command = new Command(this.remote);
					customer = generator.getRandomCustomer();
					payPalInfo = generator.getPayPalLogin();

					return command
					.configureNewMobileSession(35000)
					.get(config.URL + '/account');
				},

				'create new account' : function() {
					return command
					.createNewAccount(customer)
					.assertLoggedIn();
				},

				'add address' : function() {
					return command
					.get(config.URL + '/account')
					.findAndClick(
						'#page-account > div > div.faux-box-over > div.account-tabs.tabs-container.tabs-static > div.tab-nav > div:nth-child(3) > a'
					)
					.findAndClick('a[title="Create New Address"]')
           	 		.fillAddNewAddressForm(customer);
				},

				'fill product info' : function() {
					return command
					.get(config.URL + '/lens/biofinity')
					.findAndClick('#enterManuallyButton')
					.mobileFillBiofinityInfo();
				},

				'click continue' : function() {
					return command
					.findAndClick('button[name="dwfrm_cart_checkoutCart"]');
				},

				'fill doctor info' : function() {
					return command
					.mobileFillDrInfo(customer);
				},

				'click pay with paypal' : function() {
					return command
					.sleep(1000) // sometimes it can't click the pay with paypal button if it goes too fast
					.findAndClick('a[class="btn btn-trigger-order submit-pp btn-orange hidden-paypal-return"]');
				},

				'login and continue paypal' : function() {
					return command
					.sleep(2500) // wait for paypal login form to load
					.enterInputWithoutJQuery('email', payPalInfo.email)
					.enterInputWithoutJQuery('password', payPalInfo.password)
					.execute(function() {
						// the continue input is enabled by an event on the password field
						// that doesn't trigger since we just set the value with JS
						document.getElementById('login').removeAttribute('disabled');
					}, [])
					.findAndClick('#login')
					.findAndClick('#continue');
				},

				'click place order' : function() {
					return command
					.findAndClick('a[class="btn btn-orange btn-trigger-order submit-cc"]');
				},

				'validate order success' : function() {
					return command
					.assertOrderSuccess();
				}
			};
		});
	});