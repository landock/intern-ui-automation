define([
	'intern!object',
	'../../config',
	'../../utility/generator',
	'intern/chai!assert',
	'../customCommands/AllCommands',
	'../../utility/skipRemainingTests'
	],

	function (registerSuite, config, generator, assert, Command, skip) {
		registerSuite(function() {
			var customer;
			var command;
			var creditCard;

			return {
				name: 'mobile logged-in customer can pay with AmericanExpress during checkout',

				setup: function() {
					command = new Command(this.remote);
	                customer = generator.getRandomCustomer();
	                creditCard = generator.getCreditCardNumber('amex');

	                return command
	                .configureNewMobileSession(45000)
	                .get(config.URL + '/account');
				},

				beforeEach : function() {
					skip(this);
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

				'test card payment process' : function() {
					return command
					.get(config.URL + '/lens/acuvue-oasys-24')
					.mobileTestCardPayment(customer, creditCard);
				},

				'assert order sucess' : function() {
					return command
					.findByClassName('thankyou-msg');
				}
			};
		});
	});