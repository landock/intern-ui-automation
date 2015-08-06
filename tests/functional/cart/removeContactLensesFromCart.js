define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands',
    'intern/dojo/node!leadfoot/helpers/pollUntil',
],
function (registerSuite, config, Command, pollUntil) {
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
            
            'add another box of contact' : function(){
                return command
                .get(config.URL + '/lens/acuvue-oasys-24')
                .fillInfo();
            },
            
            'click on the Remove link for the first item': function(){
                return command
                .findAndClick('button[name="dwfrm_cart_shipments_i0_items_i0_deleteProduct"]')
            },
            
            'assert that 1 item is in the cart': function(){
                return command
                .then(pollUntil(function(){
                    var quantity = $('#btn-my-account > li.cart > p > a > span').text();
                    return quantity.indexOf('1') != -1 ? true : null;
                }, [], 60000, 1000))
                .assertElementText('#btn-my-account > li.cart > p > a > span','1')
            },
            
            'Remove first item again': function(){
                return command
                .findAndClick('button[name="dwfrm_cart_shipments_i0_items_i0_deleteProduct"]')
            }
        }
    });
});


