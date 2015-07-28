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
                command = new Command(this.remote);
                return command
                .configureNewSession(60000)
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
                .sleep(2000) //wait for ajax to update value
                .assertElementText('#btn-my-account > li.cart > p > a > span','1')
            }
        }
    });
});


