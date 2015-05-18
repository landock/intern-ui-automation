define(['../../config'],

function (config) {
    function Home(remote){
        this.remote = remote;
    }

    Home.prototype = {
        constructor: Home,
        'navigateToAcuvueOasys24': function () {
            return this.remote
                .get(config.URL + '/home/index')
                .findByCssSelector('#primary-nav div ul>li.brand')
                .moveMouseTo()
                .findByLinkText('Air Optix')
                .moveMouseTo()
                .end()
                .findAllByCssSelector('li.link.flyout')
                .findByLinkText('\nAir Optix Aqua\n')
                .click()
                .getCurrentUrl()
                .then(function(name){
                    return name;
                });
        },
        'signInFlyout': function(customer){
            return this.remote
                .findByCssSelector('a[data-flyout-id="flyout-sign-in"]')
                .click()
                .findByCssSelector('#email-address-modal')
                .type(customer.email)
                .findByCssSelector('#loginPassword')
                .type(customer.password)
                .findByCssSelector('#dwfrm_login_login')
                .click()
                .getByCssSelector('.html-slot-container h1')
                .getVisibleText()
                .then(function(text){
                    return text;
                });
        }
    };	      
    return Home;
});
