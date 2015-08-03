define([
    'intern!object',
    '../../config',
    '../../utility/generator',
    'intern/chai!assert',
    '../customCommands/AllCommands'
],
function (registerSuite, config, generator, assert, Command) {
    registerSuite(function(){
        var customer;
        var command;
        return {
            name: 'existing customer can log in using Google Plus',
            setup: function() {
                customer = generator.getGigyaLogin();
                command = new Command(this.remote);
                return command
                .configureNewSession(60000)
                .get('http://www.1800contacts.com/');
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
                    .switchToWindow(handles[1])
                    .findById('Email')
                    .type(customer.email)
                    .end()
                    .findAndClick('#next')
                    .end()
                    .findById('Passwd')
                    .type(customer.password)
                    .end()
                    .findAndClick('#signIn')
                    .switchToWindow(handles[0])
                    .findById('logged-in-state');
                });
            }
        };
    });
});
