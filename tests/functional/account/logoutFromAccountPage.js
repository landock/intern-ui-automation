define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands',
    '../../utility/generator'
],
function (registerSuite, config, Command, generator) {
    registerSuite(function(){
        var command;
        var customer;
        return {
            name: 'new logged-in customer can logout',
            setup: function() {
                command = new Command(this.remote);
                customer = generator.getExistingCustomer(0);
                return command
                .configureNewSession(60000)
                .get(config.URL + '/account');
            },
            'login using header' : function(){
                return command
                .loginFromHeader(customer)
            },
            'assert login' : function(){
                return command
                .assertLoggedIn()
            },
            'log out using link in header': function(){
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
