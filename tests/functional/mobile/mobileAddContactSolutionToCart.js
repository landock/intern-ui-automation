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
            name: 'mobile non-logged in customer can add contact solution to cart',
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
            }
        };
    });
});
