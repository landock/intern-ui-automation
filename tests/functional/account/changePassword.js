define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands',
    '../../utility/generator',
    '../../utility/skipRemainingTests'
],
function (registerSuite, config, Command, generator, skip) {
    registerSuite(function(){
        var thisthis = this;
        var command;
        var email;
        var newPassword = 'anewpassword';
        var customer;
        return {
            name: 'new logged-in customer can change password',
            setup: function() {
                customer = generator.getRandomCustomer();
                command = new Command(this.remote);
                return command
                .configureNewSession(10000)
                .get(config.URL + '/account');
            },

            beforeEach: function() {
                skip(this);
            },
            
            'create new account': function(){
                return command
                .findAndClick('asdfasdf')
                .createNewAccount(customer);
            },
            'assert that new user is logged in': function() {
                return command
                .assertLoggedIn();
            },
            
            'go to edit profile page' : function(){
                return command
                .get(config.URL + '/edit-profile');
            },
            'get current email from text input': function() {
                return command
                .execute(function(){
                   return $('#dwfrm_profile_account_email').val()
                })
                .then(function(input_email){
                    email = input_email;
                })
            },
            'enter new password and confirm': function(){
                return command
                .enterInput('#dwfrm_profile_account_password',newPassword)
                .enterInput('#dwfrm_profile_account_passwordconfirm',newPassword)
            },
            'click update button': function(){
                return command
                .findAndClick('button[name="dwfrm_profile_confirm"]');
            },
            'log out using link in header': function(){
                return command
                .logoutFromHeader();
            },
            'log back in using new password': function(){
                return command
                .loginFromHeader({'email':email,'password':newPassword});
            },
            'assert that user is logged in using changed password': function() {
                return command
                .assertLoggedIn()
            },
            'logout' : function(){
                return command
                .logoutFromHeader()
                .assertLoggedOut()
            }
        }
    });
});
