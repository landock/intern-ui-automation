define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands'
],
function (registerSuite, config, Command) {
    registerSuite(function(){
        var command;
        var email;
        var newPassword = 'anewpassword';
        return {
            name: 'new logged-in customer can create a new account',
            setup: function() {
                //this is a follow-on test, should be run after createNewAccount
                command = new Command(this.remote);
                return this.remote
                //.clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL + '/edit-profile');
            },

            beforeEach: function() {
                return command
                .removeDemandWareWidget();
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
