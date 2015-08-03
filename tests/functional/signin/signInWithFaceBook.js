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
            name: 'existing customer can log in using Facbook',
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
            'click on FaceBook Sign In button': function(){
                return command
                .findAndClick('html.no-touch body div#wrapper section.hero.home div.wrap div.hero-info-wrap div.hero-info div.hero-info-bottom div.inline-region div#inline-sign-in.inline-wrap div.inline-container div.content div div.sign-in div.row.col-8.sign-in-content div.col.span-6 div.row.col-2 div.col.account-social a.btn.btn-social-icon.btn-facebook')
                .sleep(2000);
            },
            'switch focus to new window': function(){
                return command
                .getAllWindowHandles()
                .then(function(handles){
                    return command
                    .switchToWindow(handles[1])
                    .findById('email')
                    .type(customer.email)
                    .end()
                    .findById('pass')
                    .type(customer.password)
                    .end()
                    .findAndClick('#u_0_2')
                    .switchToWindow(handles[0])
                    .findById('logged-in-state');
                });

            },
        };
    });
});

