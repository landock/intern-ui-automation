define([
    './BaseCommand'
],

function(BaseCommand){
    var proto = HomeCommand.prototype = Object.create(BaseCommand.prototype, {});
    
    function HomeCommand() {
	   BaseCommand.apply(this, arguments);
    }
    
    proto.constructor = HomeCommand;
    
     proto.navigateToAcuvueOasys24 = function () {
        return new this.constructor(this, function () {
            return this.parent
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
         });
    };
    
    proto.checkReorder = function () {
        return new this.constructor(this, function () {
            return this.parent
                .getCurrentUrl()
                .then(pollUntil(utils.elementVisibleByClass, ['page-content'], 30000, 500))

                .then(function(ele){
                    console.log('checkReorder: FOUND ELE?');
                    return self
                        .getCurrentUrl();
                }, function(error){
                    console.log('DID NOT FIND CART-WRAPPER');
                    return error;
                });
         });
    };
    
    proto.hoverMyAccount = function () {
        return new this.constructor(this, function () {
            return this.parent
                .findByCssSelector('#logged-in-state > p > a')
                .moveMouseTo()
                .sleep(3000);
         });
    };
    
    proto.navigateToDashboard = function () {
        return new this.constructor(this, function () {
            return this.parent
                .findByCssSelector('#sub-menu li:first-child a')
                .click()
                .then(pollUntil(utils.elementVisibleByClass, ['account-tabs'], 30000, 500))
                .then(function(ele){
                    return true;
                }, function(error){
                    return false;
                });
         });
    };
    
    return HomeCommand;
});