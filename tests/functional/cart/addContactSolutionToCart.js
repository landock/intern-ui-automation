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

					return command
                    .configureNewSession(60000)
					.get(config.URL + '/contact-lens-solution/systane-balance');
				},

				'click add to cart button': function() {
					return command
					.findAndClick('a[class="btn btn-orange btn-add-cart align-center full-width"]');
				},

				'assert that 1 item is in the cart': function() {
					return command
					.assertElementText('#btn-my-account > li.cart > p > a > span','1');
				},
                'click on the Remove link for the first item': function(){
                    return command
                    .findAndClick('button[name="dwfrm_cart_shipments_i0_items_i0_deleteProduct"]');
                }
			};
		});
	});