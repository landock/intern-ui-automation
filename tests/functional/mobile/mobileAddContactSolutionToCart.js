define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands'
],
function (registerSuite, config, Command) {
    registerSuite(function(){
        var command;
        return {
            name: 'mobile non-logged in customer add solution to cart',
            setup: function() {
                command = new Command(this.remote);
                return this.remote
                .configureNewSession(60000)
                .mobileGet(config.URL + '/contact-lens-solution/opti-free-puremoist-drops')
                .removeDemandWareWidget();
            },

            'click add to cart button': function() {
                return command
                .findAndClick('a[class="btn btn-orange btn-add-cart align-center full-width"]');
            },

            'assert that 1 item is in the cart': function(){
                return command
                .assertElementText('span[class="num-items-cart"]','1');
            }
        };
    });
});
