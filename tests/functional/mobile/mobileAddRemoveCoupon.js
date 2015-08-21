define([
	'intern!object',
	'../../config',
	'../../utility/generator',
	'intern/chai!assert',
	'intern/dojo/node!leadfoot/helpers/pollUntil',
	'../customCommands/AllCommands',
	'../../utility/skipRemainingTests'
],

function (registerSuite, config, generator, assert, pollUntil, Command, skip) {
	registerSuite(function() {
		var command;
		var totalBeforeCoupon;
		var couponCode;
		var priceSelector = '#summary > div.row.pricing-info > div > div:nth-child(1) > div.col.span-1 > p > strong';

		return {
			name : 'mobile non logged-in customer can add and remove coupon',

			setup : function() {
				command = new Command(this.remote);
				couponCode = generator.getPromoCode('Anybody', 0);

				return command
				.configureNewMobileSession()
				.get(config.URL + '/lens/biofinity');
			},

			beforeEach : function() {
				skip(this);
			},

			'fill lense info' : function() {
				return command
				.findAndClick('#enterManuallyButton')
				.mobileFillBiofinityInfo();
			},

			'get total price' : function() {
				return command
				.findDisplayedByCssSelector(priceSelector)
				.getVisibleText()
				.then(function(txt) {
					totalBeforeCoupon = txt;
				});
			},

			'add coupon code' : function() {
				return command
				.findAndClick('div[class="row col-9 offer-code-form"]')
				.enterInput('#dwfrm_cart_couponCode', couponCode)
				.findAndClick('#promo-code');
			},

			'assert total price has decreased' : function() {
				return command
                .then(pollUntil(function(priceSelector, totalBeforeCoupon){
                    var newPrice = $(priceSelector).text();
                    return newPrice && (newPrice != totalBeforeCoupon) ? newPrice : null;
                }, [priceSelector, totalBeforeCoupon], 60000, 1000))
                .then(function(new_price){
                    var new_price_float = parseInt(new_price.substr(1));
                    var prev_price_float = parseInt(totalBeforeCoupon.substr(1));
                    assert(new_price_float && prev_price_float && new_price_float < prev_price_float, 'new price is not lower than old price');
                });
			},

			'remove coupon' : function() {
				return command
				.findAndClick('a[title="Remove"]');
			},

			'assert total price has returned to pre-coupon levels' : function() {
				return command
				.then(pollUntil(function(priceSelector, totalBeforeCoupon){
					var newPrice = $(priceSelector).text();
					return newPrice && (newPrice == totalBeforeCoupon) ? newPrice : null;
				}, [priceSelector, totalBeforeCoupon], 60000, 1000))
				.then(function(new_price){
					var newPriceFloat = parseInt(new_price.substr(1));
					var prevPriceFloat = parseInt(totalBeforeCoupon.substr(1));
					assert(newPriceFloat && prevPriceFloat && newPriceFloat == prevPriceFloat, 'new price is not the same as old price');
				});
			}
		};
	});
});