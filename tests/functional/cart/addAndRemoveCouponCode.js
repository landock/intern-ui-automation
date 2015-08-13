define([
    'intern!object',
    '../../config',
    'intern/chai!assert',
    'intern/dojo/node!leadfoot/helpers/pollUntil',
    '../customCommands/AllCommands',
    '../../utility/generator'
],
function (registerSuite, config, assert, pollUntil, Command, generator) {
    registerSuite(function(){
        var command;
        var prevPrice;
        var priceElem = '#summary > div.row.pricing-info > div > div:nth-child(1) > div.col.span-1 > p > strong';
        var couponCode;
        return {
            name: 'non-logged in customer can add and remove a coupon code',
            setup: function() {
                command = new Command(this.remote);
                couponCode = generator.getPromoCode('Anybody',0);
                return command
                .configureNewSession()
                .get(config.URL + '/lens/biofinity');
            },
            
            'fill out lens info': function(){
                return command.fillBiofinityInfo();
            },
            
            'get total price': function(){
                 return command
                .findDisplayedByCssSelector(priceElem)
                .getVisibleText()
                .then(function(prev_price){
                    prevPrice = prev_price;
                });
            },
            
            'add coupon code': function(){
                return command
                .findAndClick('#summary > div.row.shipping-coupon > div > div.row.col-9.offer-code-form > div > form > a')
                .enterInput('#dwfrm_cart_couponCode', couponCode)
                .findAndClick('#promo-code');
            },
            
            'assert that total price has decreased': function(){
                return command
                .then(pollUntil(function(priceElem, prevPrice){
                    var new_price = $(priceElem).text();
                    return new_price && (new_price != prevPrice) ? new_price : null;
                }, [priceElem, prevPrice], 60000, 1000))
                .then(function(new_price){
                    var new_price_float = parseInt(new_price.substr(1));
                    var prev_price_float = parseInt(prevPrice.substr(1));
                    assert(new_price_float && prev_price_float && new_price_float < prev_price_float, 'new price is not lower than old price');
                });
            },
            
            'remove coupon' : function(){
                return command
                .findAndClick('a[data-coupon-name="dwfrm_cart_coupons_i0_deleteCoupon"]');
            },
            
            'assert that total price has increased back to old price': function(){
                return command
                .then(pollUntil(function(priceElem, prevPrice){
                    var new_price = $(priceElem).text();
                    return new_price && (new_price == prevPrice) ? new_price : null;
                }, [priceElem, prevPrice], 60000, 1000))
                .then(function(new_price){
                    var new_price_float = parseInt(new_price.substr(1));
                    var prev_price_float = parseInt(prevPrice.substr(1));
                    assert(new_price_float && prev_price_float && new_price_float == prev_price_float, 'new price is not the same as old price');
                });
            },
            'click on the Remove link for the first item': function(){
                return command
                .findAndClick('button[name="dwfrm_cart_shipments_i0_items_i0_deleteProduct"]')
            }
        };
    });
});


