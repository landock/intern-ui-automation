define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands',
    'intern/dojo/node!leadfoot/helpers/pollUntil',
    '../../utility/skipRemainingTests'
],
function (registerSuite, config, Command, pollUntil, skip) {
    registerSuite(function(){
        var customer;
        var command;
        return {
            name: 'non-logged in customer can remove an item from the cart',
            setup: function() {
                command = new Command(this.remote);
                return command
                .configureNewSession()
                .get(config.URL + '/lens/acuvue-oasys-24')
            },

            beforeEach : function() {
                skip(this);
            },
            
            'fill out eye info': function(){ //adds another item to the cart
                return command
                .fillInfo();
            },
            
            'add another box of contact' : function(){
                return command
                .get(config.URL + '/lens/acuvue-oasys-24')
                .fillInfo();
            },
            
            'click on the remove link for the first item': function(){
                return command
                .findAndClick('button[name="dwfrm_cart_shipments_i0_items_i0_deleteProduct"]')
            },
            
            'assert that one item is in the cart': function(){
                return command
                .then(pollUntil(function(){
                    var quantity = $('#btn-my-account > li.cart > p > a > span').text();
                    return quantity.indexOf('1') != -1 ? true : null;
                }, [], 60000, 1000))
                .assertElementText('#btn-my-account > li.cart > p > a > span','1')
            },
            
            'remove the first item': function(){
                return command
                .findAndClick('button[name="dwfrm_cart_shipments_i0_items_i0_deleteProduct"]')
            }
        }
    });
});


