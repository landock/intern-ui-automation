define([
    'intern!object',
    '../../config',
    //'intern/chai!assert',
    '../customCommands/AllCommands'
],
function (registerSuite, config, Command) {
    registerSuite(function(){
        var customer;
        var command;
        //var priceElem = '#cart-items-form > div.cart-product-tiles > div > div:nth-child(2) > div.col.span-5.col-full-width-touch.product-item-details > div:nth-child(2) > div > div:nth-child(1) > div > div.row-eye-container.row-right-eye > div.row.grid-reverse.row-prescription-specs.align-right.hidden-phone > div > div:nth-child(1) > p';
        var setPrice;
        return {
            name: 'non-logged in customer can remove an item from the cart',
            setup: function() {
                //this is a follow-on test, should be run after changeQuantityOfItem
                command = new Command(this.remote);
                return this.remote
                //.clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL + '/lens/acuvue-oasys-24')
            },
            
            'fill out eye info': function(){ //adds another item to the cart
                return command.fillInfo();
            },
            
            'click on the Remove link for the first item': function(){
                return command
                .findAndClick('button[name="dwfrm_cart_shipments_i0_items_i0_deleteProduct"]')
            },
            
            'assert that 1 item is in the cart': function(){
                return command
                .assertElementText('#btn-my-account > li.cart > p > a > span','1')
                /*.findByCssSelector('#btn-my-account > li.cart > p > a > span')
                .getVisibleText()
                .then(function(text){
                    assert.include(text, '1')
                })*/
            }
            
            /*'get price of 1 box before quantity is changed': function(){
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
                    console.log(quantity)
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
            }*/            
        }
    });
});


