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

			return {
				name: 'mobile customer can re-order',

				setup: function() {
					command = new Command(this.remote);
					customer = generator.getRandomCustomer();

					return command
					.configureNewMobileSession(60000)
					.get(config.URL + '/account');		
				},

				'create a new account on mobile test' : function() {
					return command
					.createNewAccount(customer);
				}
			};
		});
	});