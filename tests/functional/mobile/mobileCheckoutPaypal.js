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
					customer = generator.getExistingCustomer(config.existingId);
					payPalInfo = generator.getPayPalLogin();

					return command
					.configureNewMobileSession(35000)
					.get(config.URL + '/lens/biofinity');
				},

				'fill product info' : function() {
					return command
					.findAndClick('#enterManuallyButton')
					.mobileFillBiofinityInfo();
				},

				'click continue' : function() {
					return command
					.findAndClick('button[name="dwfrm_cart_checkoutCart"]');
				},

				'sign in from cart' : function() {
					return command
					.signInFromCart(customer);
				},

				'fill doctor info' : function() {
					return command
					.mobileFillDrInfo(customer);
				},

				'click paypal radio button' : function() {
					return command
					.findAndClick('div[class="row paypal"] > label > span > span > img');
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