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
            name: 'customer can log in using Google Plus',
            setup: function() {
                customer = generator.getGigyaLogin('googleplus');
                command = new Command(this.remote);
                return this.remote
                .clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get('http://www.1800contacts.com/');
            },
            'click on Sign In button': function(){
                return command
                .findAndClick('a[data-inline-id="inline-sign-in"]');
            },
            'click on Google Plus Sign In button': function(){
                return command
                .findAndClick('#inline-sign-in > div > div > div > div > div.row.col-8.sign-in-content > div > div > div.col.account-social > a.btn.btn-social-icon.btn-google');
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
                    //.sleep(3000)
                    /*.end()
                    .findAndClick('#page-account > div > div.account-tabs.tabs-container.tabs-static > div.tab-nav.tab-nav-static > div > div:nth-child(2) > a')
                    */
                    
                });   
            }
        };
    });
});