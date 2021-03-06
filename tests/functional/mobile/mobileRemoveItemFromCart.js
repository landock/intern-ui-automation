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
            name: 'mobile non-logged in customer remove item from cart',
            setup: function() {
                command = new Command(this.remote);
                return command
                .configureNewMobileSession()
                .get(config.URL + '/contact-lens-solution/opti-free-puremoist-drops');
            },

            beforeEach : function() {
                skip(this);
            },

            'click add to cart button': function() {
                return command
                .findAndClick('a[class="btn btn-orange btn-add-cart align-center full-width"]');
            },

            'assert that one item is in the cart': function(){
                return command
                .assertElementText('span[class="num-items-cart"]','1');
            },

            'remove item from cart' : function() {
                return command
                .findAndClick('button[class="button-text btn-remove btn-touch btn-silver"]');
            },

            'assert cart is empty': function() {
                return command
                .findByCssSelector('#page-cart-empty');
            }
        };
    });
});
