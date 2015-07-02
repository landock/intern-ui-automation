define([
    'intern!object',
    '../config',
    'intern/chai!assert'
],

function (registerSuite, config, assert) {
    registerSuite(function(){
        return {
            name: 'home page sign in button can be clicked',
            setup: function() {
                return this.remote
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL);
            },
            'click header sign in button': function() {
                return this.remote
                .findByCssSelector('a[data-flyout-id="flyout-sign-in"]')
                .click()
                .getAttribute('class')
                .then(function(className){
                    assert.include(className, 'flyout-link-on', 'login flyout visible');
                })
                .click();
            },
            'click primary sign in button': function() {
                return this.remote
                .findByCssSelector('a[data-inline-id="inline-sign-in"]')
                .click()
                .getAttribute('class')
                .then(function(className){
                    assert.include(className, 'inline-link-on', 'primary sign in flyout visible')
                });
            }
        }
    });
});
