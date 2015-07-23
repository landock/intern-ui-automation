define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands'
],
function (registerSuite, config, Command) {
    registerSuite(function(){
        var command;
        return {
            name: 'mobile non-logged in customer remove item from cart',
            setup: function() {
                command = new Command(this.remote);
                return this.remote
                .clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL + '/contact-lens-solution/opti-free-puremoist-drops');
            },

            'click add to cart button': function() {
                return command
                .findAndClick('a[class="btn btn-orange btn-add-cart align-center full-width"]');
            },

            'assert that 1 item is in the cart': function(){
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
