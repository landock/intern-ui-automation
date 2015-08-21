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
            name: 'mobile non-logged in customer can add contact lenses to cart',
            setup: function() {
                command = new Command(this.remote);
                return command
                .configureNewMobileSession()
                .get(config.URL + '/lens/acuvue-oasys-24');
            },

            beforeEach : function() {
                skip(this);
            },

            'click enter Rx manually button': function() {
                return command
                .findAndClick('#enterManuallyButton');
            },

            'fill out eye info': function(){
                return command.mobileFillInfo();
            },

            'assert that one item is in the cart': function(){
                return command
                .assertElementText('span[class="num-items-cart"]','1');
            }
        };
    });
});
