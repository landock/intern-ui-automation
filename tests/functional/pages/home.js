define([
        '../../config',
        'intern/dojo/node!leadfoot/helpers/pollUntil',
        '../../utility/functionalTestUtils'],

function (config,pollUntil, utils) {
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
                .setFindTimeout(10000)
                .findByCssSelector('a[data-flyout-id="flyout-sign-in"]')
                .click()
                .end()
                .findByCssSelector('#email-address-modal')
                .type(customer.email)
                .end()
                .findByCssSelector('#loginPassword')
                .type(customer.password)
                .end()
                .findByCssSelector('#dwfrm_login_login')
                .click()
                .end()
                .sleep(5000);
                //.setFindTimeout(10000)
        },
        'checkReorder': function(){
            var self = this.remote;
            return this.remote
                .getCurrentUrl()
                .then(pollUntil(utils.elementVisibleByClass, ['page-content'], 60000))

                .then(function(ele){
                    console.log('FOUND ELE?');
                    return self
                        .getCurrentUrl();
                }, function(error){
                    console.log('DID NOT FIND CART-WRAPPER');
                    return error;
                });
        },
        'hoverMyAccount': function(){
            return this.remote
                .findByCssSelector('#logged-in-state > p > a')
                .moveMouseTo();
        },
        'navigateToDashboard': function(){
            return this.remote
                .findByCssSelector('#sub-menu li:first-child')
                .click()
                .then(pollUntil(utils.elementVisibleByClass, ['account-tabs'], 60000))
                .then(function(ele){
                    return true;
                }, function(error){
                    return false;
                });
        }
    };	      
    return Home;
});
