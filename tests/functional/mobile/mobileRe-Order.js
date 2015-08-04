define([
	'intern!object',
	'../../config',
	'../../utility/generator',
	'../customCommands/AllCommands'
	],

	function (registerSuite, config, generator, Command) {
		registerSuite(function() {
			var command;
			var customer;
			var creditCard;

			return {
				name: 'mobile customer can re-order',

				setup: function() {
					command = new Command(this.remote);
					customer = generator.getRandomCustomer();
					creditCard = generator.getCreditCardNumber('amex');

					return command
					.configureNewMobileSession(60000)
					.get(config.URL + '/account');		
				},

				// create new account
				// add address
				// buy something (credit card test command)
				// go to dashboard
				// select order
				// click re-order
				// complete re-order transaction

				'create new account' : function() {
					return command
					.createNewAccount(customer)
					.assertLoggedIn();
				},

				'navigate to account page' : function() {
					return command
					.findAndClick('#icon-mobile-menu')
					.findAndClick('a[title="My Account"]');
				},

				'navigate to account page address tab' : function() {
					return command
					.findAndClick('#page-account > div > div.faux-box-over > div.account-tabs.tabs-container.tabs-static > div.tab-nav > div:nth-child(3) > a');
				},

				'create a new address': function() {
           	 		return command
           	 		.findAndClick('a[title="Create New Address"]')
           	 		.fillAddNewAddressForm(customer);
           	 	},

           	 	'mobile - test card payment process' : function() {
					return command
					.get(config.URL + '/lens/acuvue-oasys-24')
					.mobileTestCardPayment(customer, creditCard);
				},

				'navigate to account page again' : function() {
					return command
					.findAndClick('#icon-mobile-menu')
					.findAndClick('a[title="My Account"]');
				},

				're-order first item in order history' : function() {
					return command
					.findAndClick('#dwfrm_dashboarditems > div:nth-child(2) > div > div:nth-child(1) > div > div.row.recent-pres-header > div > label')
					.findAndClick('#btn-reorder-rx')
					.findAndClick('button[name="dwfrm_cart_checkoutCart"]')
					.findAndClick('.submit-cc');
				},

				'assert that the order was a success' : function() {
					return command
					.findByClassName('thankyou-msg');
				}
			};
		});
	});