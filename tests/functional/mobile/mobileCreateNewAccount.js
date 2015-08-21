define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands',
    '../../utility/generator',
    '../../utility/skipRemainingTests'
],
function (registerSuite, config, Command, generator, skip) {
    registerSuite(function(){
        var customer;
        var command;
        return {
            name: 'mobile non-logged in customer can create a new account',
            setup: function() {
                customer = generator.getRandomCustomer();
                command = new Command(this.remote);
                return command
                .configureNewMobileSession()
                .get(config.URL + '/account');
            },

            beforeEach : function() {
                skip(this);
            },

            'create new account' : function() {
                return command
                .createNewAccount(customer);
            },
            
            'assert that new user is logged in': function() {
                return command
                .assertLoggedIn();
            },
        };
    });
});
