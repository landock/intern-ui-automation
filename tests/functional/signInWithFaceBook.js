define([
    'intern!object',
    '../config',
    '../utility/generator',
    'intern/chai!assert',
    './customCommands/AllCommands'
],
function (registerSuite, config, generator, assert, Command) {
    registerSuite(function(){
        var customer;
        var command;
        return {
            name: 'customer can log in from cart',
            setup: function() {
                customer = generator.getGigyaLogin('facebook');
                command = new Command(this.remote);
                return this.remote
                .clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL)
            },
            'click on Sign In button': function(){
                return command
                .findAndClick('a[data-inline-id="inline-sign-in"]')
            },
            'click on FaceBook Sign In button': function(){
                return command
                .findAndClick('html.no-touch body div#wrapper section.hero.home div.wrap div.hero-info-wrap div.hero-info div.hero-info-bottom div.inline-region div#inline-sign-in.inline-wrap div.inline-container div.content div div.sign-in div.row.col-8.sign-in-content div.col.span-6 div.row.col-2 div.col.account-social a.btn.btn-social-icon.btn-facebook')
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
                    .sleep(500000)
                    //.enterInput('email', customer.email)
                    //.enterInput('#pass', customer.password)
                    /*.then(function(current_handle){
                        console.log('it is')
                        console.log(handles.indexOf(current_handle))
                    })*/
                });
                    
            },
            /*'click continue button from cart': function() {
                return command
                .findAndClick('button[name="dwfrm_cart_checkoutCart"]');
            },
            'click on returning customer sign in button': function() {
                return command
                .findAndClick('a[data-modal-id="modal-sign-in"]');
            },
            'fill out email field': function(){
                return command
                .enterInput('#email-address-modal', customer.email);
            },
            'fill out password field':  function(){
                return command
                .enterInput('#loginPassword', customer.password);
            },
            'submit form': function() {  
                return command
                .findAndClick('#dwfrm_login_login')
                .end()
                .getCurrentUrl()
                .then(function(url){
                    assert.include(url, 'cart');
                });
            }*/
        }
    });
});