define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands',
    '../../utility/generator'
],
function (registerSuite, config, Command, generator) {
    registerSuite(function(){
        var customer;
        var command;
        return {
            name: 'non-logged in customer can create a new account',
            setup: function() {
                customer = generator.getRandomCustomer();
                command = new Command(this.remote);
                return this.remote
                .clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL + '/account');
            },
            
            'create new account': function(){
                return command
                .createNewAccount(customer);
            },
            
            'assert that new user is logged in': function() {
                return command
                .findById('logged-in-state');
            }
        }
    });
});
