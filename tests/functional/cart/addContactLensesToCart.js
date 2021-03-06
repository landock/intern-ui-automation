define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands',
    '../../utility/skipRemainingTests'
],
function (registerSuite, config, Command, skip) {
    registerSuite(function(){
        var command;
        return {
            name: 'non-logged in customer can add contact lenses to cart',
            setup: function() {
                command = new Command(this.remote);
                return command
                .configureNewSession()
                .get(config.URL + '/lens/acuvue-oasys-24');
            },

            beforeEach: function() {
                skip(this);
            },

            'fill out eye info': function(){
                return command.fillInfo();
            },
            'assert that 1 item is in the cart': function(){
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
