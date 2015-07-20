define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands'
],
function (registerSuite, config, Command) {
    registerSuite(function(){
        var command;
        return {
            name: 'new logged-in customer can logout',
            setup: function() {
                //this is a follow-on test, should be run last in the accounts tests
                command = new Command(this.remote);
                return this.remote
                //.clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                //.get(config.URL + '/account');
            },
            'log out using link in header': function(){
                return command
                .logoutFromHeader();
            },
        }
    });
});
