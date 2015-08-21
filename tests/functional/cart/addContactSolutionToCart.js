define([
	'intern!object',
	'../../config',
	'../customCommands/AllCommands',
    '../../utility/skipRemainingTests'
	],

	function (registerSuite, config, Command, skip) {
		registerSuite(function() {
			var command;

			return {
				name: 'non-logged in customer can add contact solution to cart',

				setup: function() {
					command = new Command(this.remote);

					return command
                    .configureNewSession()
					.get(config.URL + '/contact-lens-solution/systane-balance');
				},

                beforeEach: function() {
                    skip(this);
                },

				'click add to cart button': function() {
					return command
					.findAndClick('a[class="btn btn-orange btn-add-cart align-center full-width"]');
				},

				'assert that one item is in the cart': function() {
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
