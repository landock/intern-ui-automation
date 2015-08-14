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
                return command
                .configureNewMobileSession()
                .get(config.URL + '/account');
            },

            // 'click on New Customer radio button': function(){
            //     return command
            //     .findAndClick('label[for="new"]');
            // },
            
            // 'fill in customer info': function() {
            //     return command
            //     .enterInput('#email-address', customer.email)
            //     .enterInput('#dwfrm_profile_login_password', customer.password)
            //     .enterInput('#dwfrm_profile_login_passwordconfirm', customer.password_confirm);
            // },
            
            // 'click sign in': function() {
            //     return command
            //     .findAndClick('button[name="dwfrm_profile_confirm"]');
            // },

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
