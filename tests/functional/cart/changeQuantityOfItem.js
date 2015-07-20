define([
    'intern!object',
    '../../config',
    'intern/chai!assert',
    '../customCommands/AllCommands'
],
function (registerSuite, config, assert, Command) {
    registerSuite(function(){
        var customer;
        var command;
        var priceElem = '#cart-items-form > div.cart-product-tiles > div > div:nth-child(2) > div.col.span-5.col-full-width-touch.product-item-details > div:nth-child(2) > div > div:nth-child(1) > div > div.row-eye-container.row-right-eye > div.row.grid-reverse.row-prescription-specs.align-right.hidden-phone > div > div:nth-child(1) > p';
        var setPrice;
        return {
            name: 'non-logged in customer can edit quantity of item in cart',
            setup: function() {
                //this is a follow-on test, should be run after addContactLensesToCart
                command = new Command(this.remote);
                return this.remote
                //.clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                //.get(config.URL + '/lens/acuvue-oasys-24')
            },
            
            'change quantity of item': function(){
                return command
                .setDropdown('#dwfrm_cart_shipments_i0_items_i0_rightEyeQuantity_desktop','2')
            },
            
            'get price of 1 box before quantity is changed': function(){
                 return command
                .findByCssSelector(priceElem)
                .getVisibleText()
                .then(function(prev_price){
                    setPrice = prev_price;
                })
            },
            
            'assert that 2 right eye boxes are in the cart': function(){
                return command
                .execute(function(){
                    return $('#dwfrm_cart_shipments_i0_items_i0_rightEyeQuantity_desktop').val()
                })
                .then(function(quantity){
                    assert.include(quantity, '2')
                })
            },
            
            'assert that price for changed quantity has increased': function(){
                return command
                .sleep(2000) //wait for ajax to update value
                .findByCssSelector(priceElem)
                .getVisibleText()
                .then(function(updated_price){
                    assert.notEqual(updated_price, setPrice);
                })
            }            
        }
    });
});


