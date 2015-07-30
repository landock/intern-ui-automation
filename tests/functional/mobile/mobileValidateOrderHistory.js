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
	                customer = generator.getExistingCustomer(config.existingId);
	                creditCard = generator.getCreditCardNumber('AmericanExpress');
	                return command
	                .configureNewMobileSession(60000)
	                .get(config.URL + '/lens/acuvue-oasys-24');
				},

				'place order' : function() {
					return command
					.mobileTestCardPayment(customer, creditCard);
				},

				'get order number' : function() {
					return command
					.findByCssSelector('p[class="no-phone-link"]')
					.getVisibleText()
					.then(function(txt){
						console.log(txt);
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
					.findByCssSelector('p[class="no-phone-link"]')
					.getVisibleText()
					.then(function(txt) {
						assert.equal(txt, orderNumber);
					});
				}
			};
		});
	});	