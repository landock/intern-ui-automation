define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands'
],
function (registerSuite, config, Command) {
    registerSuite(function(){
        var customer;
        var command;
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
            }
        }
    });
});


