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

			return {
				name: 'mobile logged-in customer can pay with AmericanExpress during checkout on mobile device',

				setup: function() {
				command = new Command(this.remote);
                customer = generator.getExistingCustomer(0);
                creditCard = generator.getCreditCardNumber('AmericanExpress');
                return command
                .configureNewMobileSession(60000)
                .get(config.URL + '/lens/acuvue-oasys-24');
				},

				'mobile - test card payment process' : function() {
					return command
					.mobileTestCardPayment(customer, creditCard);
				},

				'assert that the order was a success' : function() {
					return command
					.findByClassName('thankyou-msg');
				}
			};
		});
	});