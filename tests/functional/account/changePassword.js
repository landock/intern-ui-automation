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
        var customer;
        return {
            name: 'new logged-in customer can create a new account',
            setup: function() {
                customer = generator.getRandomCustomer();
                command = new Command(this.remote);
                return command
                .configureNewSession(60000)
                .get(config.URL + '/account');
            },
            
            'create new account': function(){
                return command
                .createNewAccount(customer);
            },
            'assert that new user is logged in': function() {
                return command
                .assertLoggedIn()
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
        }
    });
});
