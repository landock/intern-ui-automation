define([
	'intern!object',
	'../../config',
	'../customCommands/AllCommands'
	],

	function (registerSuite, config, Command) {
		registerSuite(function() {
			var command;

			return {
				name: 'desktop non-logged in customer add solution to cart',

				setup: function() {
					command = new Command(this.remote);

					return this.remote
					.clearCookies()
					.setTimeout('script', 60000)
					.setTimeout('page load', 60000)
					.setFindTimeout(50000)
					.get(config.URL + '/contact-lens-solution/systane-balance');
				},

				'click add to cart button': function() {
					return command
					.findAndClick('a[class="btn btn-orange btn-add-cart align-center full-width"]');
				},

				'assert that 1 item is in the cart': function() {
					return command
					.assertElementText('#btn-my-account > li.cart > p > a > span','1');
				}
			};
		});
	});