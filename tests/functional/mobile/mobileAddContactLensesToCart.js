define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands'
],
function (registerSuite, config, Command) {
    registerSuite(function(){
        var command;
        return {
            name: 'mobile non-logged in customer can add contact lenses to cart',
            setup: function() {
                command = new Command(this.remote);
                return this.remote
                .configureNewSession(60000)
                .mobileGet(config.URL + '/lens/acuvue-oasys-24')
                .removeDemandWareWidget();
            },

            'click enter Rx manually button': function() {
                return command
                .findAndClick('#enterManuallyButton');
            },

            'fill out eye info': function(){
                return command.mobileFillInfo();
            },

            'assert that 1 item is in the cart': function(){
                return command
                .assertElementText('span[class="num-items-cart"]','1');
            }
        };
    });
});
