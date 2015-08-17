define([
    'intern!object',
    '../../config',
    '../../utility/generator',
    'intern/chai!assert',
    '../customCommands/AllCommands',
    '../../utility/skipRemainingTests'
],
function (registerSuite, config, generator, assert, Command, skip) {
    registerSuite(function(){
        var customer;
        var command;
        return {
            name: 'existing customer can log in using Google Plus',
            setup: function() {
                customer = generator.getGigyaLogin();
                command = new Command(this.remote);
                return command
                .configureNewSession(35000)
                .get('http://www.1800contacts.com/');
            },

            beforeEach: function() {
                skip(this);
            },

            'click on Sign In button': function(){
                return command
                .findAndClick('a[data-inline-id="inline-sign-in"]');
            },
            'click on Google Plus Sign In button': function(){
                return command
                .findAndClick('#inline-sign-in > div > div > div > div > div.row.col-8.sign-in-content > div > div > div.col.account-social > a.btn.btn-social-icon.btn-google')
                .sleep(2000);
            },
            'switch focus to new window': function(){
                return command
                .getAllWindowHandles()
                .then(function(handles){
                    return command
                    .switchToWindow(handles[1]);
                });
            },

            'enter and submit google info' : function() {
                return command
                .sleep(1000)
                .enterInputWithoutJQuery('Email', customer.email)
                .findAndClick('#next')
                .findById('Passwd')
                .type(customer.password)
                .end()
                .findAndClick('#signIn');
            },

            'switch back to main window' : function() {
                return command
                .getAllWindowHandles()
                .then(function(handles) {
                    return command
                    .switchToWindow(handles[0])
                    .assertLoggedIn();
                });
            },

            'logout' : function(){
                return command
                .logoutFromHeader()
                .assertLoggedOut();
            }
        };
    });
});
