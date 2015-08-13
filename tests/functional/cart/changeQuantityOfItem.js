define([
    'intern!object',
    '../../config',
    'intern/chai!assert',
    'intern/dojo/node!leadfoot/helpers/pollUntil',
    '../customCommands/AllCommands'
],
function (registerSuite, config, assert, pollUntil, Command) {
    registerSuite(function(){
        var command;
        var priceElem = '#cart-items-form > div.cart-product-tiles > div > div:nth-child(2) > div.col.span-5.col-full-width-touch.product-item-details > div:nth-child(2) > div > div:nth-child(1) > div > div.row-eye-container.row-right-eye > div.row.grid-reverse.row-prescription-specs.align-right.hidden-phone > div > div:nth-child(1) > p';
        var prevPrice;
        return {
            name: 'non-logged in customer can edit quantity of item in cart',
            setup: function() {
                command = new Command(this.remote);
                return command
                .configureNewSession()
                .get(config.URL + '/lens/acuvue-oasys-24');
            },
            'fill out eye info': function(){
                return command.fillInfo();
            },
            
            'get price of 1 box before quantity is changed': function(){
                 return command
                .findByCssSelector(priceElem)
                .getVisibleText()
                .then(function(prev_price){
                    prevPrice = prev_price;
                });
            },
            
            'change quantity of item': function(){
                return command
                .setDropdown('#dwfrm_cart_shipments_i0_items_i0_rightEyeQuantity_desktop','2');
            },
            
            'assert that 2 right eye boxes are in the cart': function(){
                return command
                .execute(function(){
                    return $('#dwfrm_cart_shipments_i0_items_i0_rightEyeQuantity_desktop').val();
                })
                .then(function(quantity){
                    assert.include(quantity, '2');
                });
            },
            
            'assert that price for changed quantity has increased': function(){
                return command
                .then(pollUntil(function(priceElem,prevPrice){
                    var new_price = $(priceElem).text();
                    return new_price != prevPrice ? new_price : null;
                },[priceElem,prevPrice],60000,1000))
                .then(function(new_price){
                     assert.notEqual(new_price, prevPrice);
                });
            },
            
            'click on the Remove link for the first item': function(){
                return command
                .findAndClick('button[name="dwfrm_cart_shipments_i0_items_i0_deleteProduct"]');
            }
        };
    });
});


