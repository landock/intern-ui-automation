define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands',
    '../../utility/generator'
],
function (registerSuite, config, Command, generator) {
    registerSuite(function(){
        var command;
        var email;
        var newPassword = 'anewpassword';
        var customer = generator.getRandomCustomer();

        return {
            name: 'new logged-in customer can create a new account',
            setup: function() {
                command = new Command(this.remote);
                return command
                .configureNewSession(60000)
                .mobileGet(config.URL + '/account')
                .removeDemandWareWidget();
            },

            'create new account' : function() {
                return command
                .findAndClick('label[for="new"]')
                .enterInput('#email-address', customer.email)
                .enterInput('#dwfrm_profile_login_password', customer.password)
                .enterInput('#dwfrm_profile_login_passwordconfirm', customer.password_confirm)
                .findAndClick('button[name="dwfrm_profile_confirm"]')
                .assertLoggedIn();
            },

            'navigate to edit account page' : function() {
                return command
                .get(config.URL + '/edit-profile');
            },

            'get current email from text input': function() {
                return command
                .execute(function(){
                   return $('#dwfrm_profile_account_email').val();
                })
                .then(function(input_email){
                    email = input_email;
                });
            },

            'enter new password and confirm': function(){
                return command
                .enterInput('#dwfrm_profile_account_password',newPassword)
                .enterInput('#dwfrm_profile_account_passwordconfirm',newPassword);
            },

            'click update button': function(){
                return command
                .findAndClick('button[name="dwfrm_profile_confirm"]');
            },

            'log out using link in header': function(){
                return command
                .mobileLogout();
            },

            'log back in using new password': function(){
                return command
                .mobileLogin({'email':email,'password':newPassword});
            },

            'assert logged in with new password': function() {
                return command
                .assertLoggedIn();
            }
        };
    });
});
