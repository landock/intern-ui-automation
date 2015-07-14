define([
    './BaseCommand'
],

function(BaseCommand){
    var proto = ProductCommand.prototype = Object.create(BaseCommand.prototype, {});
    
    function ProductCommand() {
	   BaseCommand.apply(this, arguments);
    }
    
    proto.constructor = ProductCommand;
    
    proto.fillInfo = function () {
        return new this.constructor(this, function () {
            return this.parent
                .setDropdown('#dwfrm_lensproduct_rightEye_contactsPower','+1.25')
                .setDropdown('#dwfrm_lensproduct_leftEye_contactsPower','-1.25')
                .setDropdown('#dwfrm_lensproduct_rightEye_baseCurve','8.8')
                .setDropdown('#dwfrm_lensproduct_leftEye_baseCurve','8.4')
                .enterInput('#patient-first', 'Testy')
                .enterInput('#patient-last', 'Test')
                .findAndClick('#submitAndSkipContinue')
         });
    };
    
    return ProductCommand;
});


// 'button[name="dwfrm_cart_checkoutCart"]'