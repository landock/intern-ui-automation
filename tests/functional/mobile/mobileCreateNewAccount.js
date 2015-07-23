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
            name: 'mobile non-logged in customer can create a new account',
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

            'click on New Customer radio button': function(){
                return command
                .findAndClick('label[for="new"]');
            },
            
            'fill in customer info': function() {
                return command
                .enterInput('#email-address', customer.email)
                .enterInput('#dwfrm_profile_login_password', customer.password)
                .enterInput('#dwfrm_profile_login_passwordconfirm', customer.password_confirm);
            },
            
            'click sign in': function() {
                return command
                .findAndClick('button[name="dwfrm_profile_confirm"]');
            },
            
            'assert that new user is logged in': function() {
                return command
                .findById('logged-in-state');
            }
        };
    });
});