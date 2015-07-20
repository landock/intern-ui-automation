define([
    'intern!object',
    '../../config',
   // 'intern/chai!assert',
    '../customCommands/AllCommands'
],
function (registerSuite, config, Command) {
    registerSuite(function(){
        var customer;
        var command;
        return {
            name: 'non-logged in customer can add contact lenses to cart',
            setup: function() {
                command = new Command(this.remote);
                return this.remote
                .clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL + '/lens/acuvue-oasys-24')
            },
            'fill out eye info': function(){
                return command.fillInfo();
            },
            'assert that 1 item is in the cart': function(){
                return command
                .assertElementText('#btn-my-account > li.cart > p > a > span','1')
                /*.findByCssSelector('#btn-my-account > li.cart > p > a > span')
                .getVisibleText()
                .then(function(text){
                    assert.include(text, '1')
                })*/
            }
        }
    });
});
