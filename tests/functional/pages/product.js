define([
        'node_modules/intern/node_modules/dojo/promise/Promise',
        '../elements/customDropdown'
        ],
	function (Promise, Dropdown) {

        var dropdown;
	function Product(remote){
		this.remote = remote;
        dropdown = new Dropdown(this.remote);
	}
	
	function isPositive(value){
		return (value.indexOf('+') >= 0);
	}

    function uploadPicture(){
        return productPage
            .uploadPicture()
            .then(function(foundPic){
                assert.strictEqual(foundPic, true);
            });
    }
	
	Product.prototype = {
			constructor: Product,
        //  NEEDS TO BE MODULARIZED
			'enterPower': function(value, eyes){
				var selector = isPositive(value) ? 'pp-positive' : 'pp-negative';
				var id = '#dwfrm_lensproduct_rightEye_contactsPower-wrapper';
				var xPath = '//*[@id="manualEntryContainer"]/div/div[1]/div[2]/div[1]';
				
					if(eyes === "left"){
						 xPath = '//*[@id="manualEntryContainer"]/div/div[2]/div[2]/div[1]';
						 id='#dwfrm_lensproduct_leftEye_contactsPower-wrapper';
					}
					return this.remote
					.findByXpath(xPath)
						.click()
						.end()
					.findByCssSelector(id + ' ul.'+selector+' li a')
						.click()
						.end()
					.findByXpath(xPath)
						.getAttribute('data-select-value')
						.then(function(txt){
							return txt;
						});
			},
			'enterBCSelect': function(eye, value){
				var xPath = '//*[@id="manualEntryContainer"]/div/div[1]/div[3]/div';
				var id = 'dwfrm_lensproduct_rightEye_baseCurve';
				if(eye === "left"){
					xPath = '//*[@id="manualEntryContainer"]/div/div[2]/div[3]/div';
					id="dwfrm_lensproduct_leftEye_baseCurve";
				}
                return dropdown.selectByHTMLValue(id, xPath, value);
			},
			'enterBoxesSelect': function(eye, value){
				var xPath = '//*[@id="manualEntryContainer"]/div/div[1]/div[5]/div';
				var id="right-boxes-manual";
				
				if(eye === "left"){
					xPath='//*[@id="manualEntryContainer"]/div/div[2]/div[5]/div';
					id="left-boxes-manual";
				}
                return dropdown.selectByHTMLValue(id, xPath, value);
			},
			'continueSubmit': function(){
				return this.remote
                .setFindTimeout(3000)
                //.findByCssSelector('.prod-details-specs.submit-and-skip')
                //    .submit()
                .findById('submitAndSkipContinue')
                    .click()
                .sleep(3000)
                .getCurrentUrl()
                .then(function(val){
                    return val;
                });
			},
			'isEyeChecked': function(eye, remote){
				var id = "eye-right-manual";
				if(eye === "left"){
					id = "eye-left-manual";
				}

				remote.findById(id)
					.getAttribute('checked')
					.then(function(isChecked){
						return isChecked === "checked";
					});
			},
        'uploadPicture': function(){
            return this.remote
                .findById('cameraInput')
                .type('/Users/CNyugen/dev/dw1800contacts_ui_tests/1800contacts-logo.jpg')
                .sleep(20000)
                .end()
                .findByCssSelector('.prescription-uploaded .rx-image-thumbnail > img')
                .then(function(ele){
                    return ele ? true : false;
                });
        }
	};	      
	return Product;
});