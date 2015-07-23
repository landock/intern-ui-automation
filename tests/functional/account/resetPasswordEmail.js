define([
    'intern!object',
    '../../config',
    '../../utility/generator',
    'intern/dojo/node!leadfoot/helpers/pollUntil',
    '../customCommands/AllCommands'
],
function (registerSuite, config, generator, pollUntil, Command) {
    registerSuite(function(){
        var customer
        var command;
         var newPassword = 'anewpassword';
        return {
            name: 'existing test customer can reset password',
            setup: function() {
                customer = generator.getExistingCustomer(config.emailResetId);
                command = new Command(this.remote);
                return this.remote
                .clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL + '/forgot-password');
            },
            'enter and submit reset request' : function() {
                return command
                .enterInput('#dwfrm_requestpassword_email', customer.email)
                //.sleep(5000)
                .findAndClick('button[name="dwfrm_requestpassword_send"]');
            },
            'go to mailinator inbox' : function(){
                return command
                .get('http://mailinator.com/inbox.jsp?to=1800contacts_email_reset_test')
            },
            'get ID of new email when it arrives' : function(){
                return command
                .then(pollUntil( function(){
                    var contains_less = 
                        $('li.row-fluid:nth-child(1) > a:nth-child(1) > div:nth-child(3)').text().indexOf('less');
                    return contains_less != -1 ? true : null;
                },[],60000,1000))
                //.findByPartialLinkText('1-800 CONTACTS | Password Reset')
                //.click()
                .execute(function(){
                    return $('#mailcontainer > li:nth-child(1) > a').attr('onclick')
                })
                .then(function(attr){
                    console.log(attr)
                    var msg_id = attr.match(/showmail\('(.*)'\)/)[1];
                    return command
                    .get('https://mailinator.com/rendermail.jsp?msgid='+msg_id)
                })
            },
            'click on password reset link in email' : function(){
                return command
                //.findByPartialLinkText('click here')
                .execute(function(){
                    return $('#wrapper > table > tbody > tr:nth-child(2) > td > font > center > table > tbody > tr > td > font > p:nth-child(2) > font > a').attr('href')
                })
                .then(function(link){
                    return command
                    .get(link)
                })
            },
            'enter new password and submit' : function(){
                return command
                .sleep(5000)
                .getCurrentUrl()
                .then(function(url){
                    console.log(url)
                })
                .enterInput('#dwfrm_resetpassword_password',newPassword)
                .enterInput('#dwfrm_resetpassword_passwordconfirm',newPassword)
                .findAndClick('button[name="dwfrm_resetpassword_send"]')
            },
            'logout' : function(){
                return command
                .logoutFromHeader()
                .assertLoggedOut()
            },
            'assert that new password works' : function(){
                return command
                .loginFromHeader({'email':customer.email,'password':newPassword})
                .assertLoggedIn()
            }
        }
    });
});