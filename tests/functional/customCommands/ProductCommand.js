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
                .sleep(500) // Chrome needs a bit of time before click events will work
                .setDesktopPowerDropdown('#dwfrm_lensproduct_rightEye_contactsPower','+1.25')
                .setDesktopPowerDropdown('#dwfrm_lensproduct_leftEye_contactsPower','-1.25')
                .setDropdown('#dwfrm_lensproduct_rightEye_baseCurve','8.8')
                .setDropdown('#dwfrm_lensproduct_leftEye_baseCurve','8.4')
                .enterInput('#patient-first', 'Testy')
                .enterInput('#patient-last', 'Test')
                .findAndClick('#submitAndSkipContinue');
         });
    };

    proto.mobileFillInfo = function () {
        return new this.constructor(this, function () {
            return this.parent
                .sleep(2500) // Chrome needs a bit of time before click events will work
                .setDropdown('#dwfrm_lensproduct_rightEye_contactsPower','+1.25')
                .setDropdown('#dwfrm_lensproduct_leftEye_contactsPower','-1.25')
                .setDropdown('#dwfrm_lensproduct_rightEye_baseCurve','8.8')
                .setDropdown('#dwfrm_lensproduct_leftEye_baseCurve','8.4')
                .enterInput('#patient-first', 'Testy')
                .enterInput('#patient-last', 'Test')
                .findAndClick('div[ng-show="canShowAddToCartButtons()"]');
         });
    };

    return ProductCommand;
});
