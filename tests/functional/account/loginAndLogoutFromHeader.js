define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands',
    '../../utility/generator',
    '../../utility/skipRemainingTests'
],
function (registerSuite, config, Command, generator, skip) {
    registerSuite(function(){
        var command;
        var customer;
        return {
            name: 'logged-in customer can login and logout from header',
            setup: function() {
                command = new Command(this.remote);
                customer = generator.getExistingCustomer(0);
                return command
                .configureNewSession(60000)
                .get(config.URL + '/account');
            },

            beforeEach:function() {
                skip(this);
            },

            'login from header' : function(){
                return command
                .loginFromHeader(customer)
            },
            'assert login' : function(){
                return command
                .assertLoggedIn()
            },
            'log out from header': function(){
                return command
                .logoutFromHeader();
            },
            'assert logout' : function(){
                return command
                .assertLoggedOut()
            }
        }
    });
});
