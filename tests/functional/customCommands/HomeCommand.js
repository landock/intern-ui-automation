define([
    './BaseCommand'
],

function(BaseCommand){
    var proto = HomeCommand.prototype = Object.create(BaseCommand.prototype, {});
    
    function HomeCommand() {
	   BaseCommand.apply(this, arguments);
    }
    
    proto.constructor = HomeCommand;
    
    proto.loginFromHome = function (customer) {
        return new this.constructor(this, function () {
            return this.parent
            .findAndClick('a[data-inline-id="inline-sign-in"]')
            .enterInput('#email-address-modal', customer.email)
            .enterInput('#loginPassword', customer.password)
            .findAndClick('#dwfrm_login_login');
        });
    };
    
    return HomeCommand;
});