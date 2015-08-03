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
            name: 'existing customer can log in using Amazon',
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
            'click on Amazon Sign In button': function(){
                return command
                .findAndClick('#inline-sign-in > div > div > div > div > div.row.col-8.sign-in-content > div > div > div.col.account-social > a.btn.btn-social-icon.btn-amazon')
                .sleep(2000);
            },
            'switch focus to new window': function(){
                return command
                .getAllWindowHandles()
                .then(function(handles){
                    return command
                    .switchToWindow(handles[1])
                    .findById('ap_email')
                    .type(customer.email)
                    .end()
                    //.findAndClick('#next')
                    //.end()
                    .findById('ap_password')
                    .type(customer.password)
                    .end()
                    .findAndClick('button[type="submit"]')
                    .switchToWindow(handles[0])
                    .findById('logged-in-state');
                });
            }
        };
    });
});
