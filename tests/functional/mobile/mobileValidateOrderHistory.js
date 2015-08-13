define([
	'intern!object',
	'../../config',
	'../../utility/generator',
	'intern/chai!assert',
	'../customCommands/AllCommands'
	],

	function (registerSuite, config, generator, assert, Command) {
		registerSuite(function() {
			var customer;
			var command;
			var creditCard;
			var orderNumber;

			return {
				name: 'mobile validate order history',

				setup: function() {
					command = new Command(this.remote);
	                customer = generator.getRandomCustomer();
	                creditCard = generator.getCreditCardNumber('amex');
	                return command
	                .configureNewMobileSession()
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

				'place order' : function() {
					return command
					.get(config.URL + '/lens/acuvue-oasys-24')
					.mobileTestCardPayment(customer, creditCard);
				},

				'get order number' : function() {
					return command
					.findByCssSelector('p[class="no-phone-link"]')
					.getVisibleText()
					.then(function(txt){
						orderNumber = txt;
					});
				},

				'navigate to order status and history page' : function() {
					return command
					.findAndClick('#icon-mobile-menu')
					.findAndClick('a[title="Order Status"]');
				},

				'validate order number' : function() {
					return command
					.sleep(1000)
					.findByCssSelector('p[class="no-phone-link"]')
					.getVisibleText()
					.then(function(txt) {
						assert.equal(txt, orderNumber);
					});
				}
			};
		});
	});	