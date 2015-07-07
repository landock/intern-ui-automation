define([ '../elements/customDropdown', '../../config', '../elements/input', '../../utility/generator' ],
       function (Dropdown, config, input, generator, require) {

           function Product(remote){
               this.remote = remote;
               this.dropdown = new Dropdown(this.remote);
               this.inputComponent = new input(this.remote);
               this.customer = generator.getExistingCustomer(config.existingId);
           }

           function isPositive(value){
               return (value.indexOf('+') >= 0);
           }

           Product.prototype = {
               constructor: Product,
               //  NEEDS TO BE MODULARIZED
               'enterPower': function(value, eyes) {
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
                   return this.dropdown.selectByHTMLValue(id, xPath, value);
               },
               'enterBoxesSelect': function(eye, value){
                   var xPath = '//*[@id="manualEntryContainer"]/div/div[1]/div[5]/div';
                   var id="right-boxes-manual";

                   if(eye === "left"){
                       xPath='//*[@id="manualEntryContainer"]/div/div[2]/div[5]/div';
                       id="left-boxes-manual";
                   }
                   return this.dropdown.selectByHTMLValue(id, xPath, value);
               },
               'continueSubmit': function(){
                   return this.remote
                   .findById('submitAndSkipContinue')
                   .click()
                   .getCurrentUrl()
                   .then(function(url){
                       return url;
                   });
               },
               'isEyeChecked': function(eye, remote){
                   var id = "eye-right-manual";

                   if (eye === "left") {
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
                   .type(config.absPicPath)
                   .end()
                   .findByCssSelector('.prescription-uploaded .rx-image-thumbnail > img')
                   .then(function(ele){
                       return ele ? true : false;
                   });
               },
               'setLeftEyePower': function(){
                   return this.enterPower('-0.50', "left")
               },
               'setRightEyePower': function(){
                   return this.enterPower('-0.50', "right")
               },
               'setBCLeftEye': function(){
                   return this.enterBCSelect("left", "8.4")
               },
               'setBCRightEye': function(){
                   return this.enterBCSelect("right", "8.8")
               },
               'setBoxesLeftEye': function(){
                   return this.enterBoxesSelect("left", "1")
               },
               'setBoxesRightEye': function(){
                   return this.enterBoxesSelect("right", "1")
               },
               'enterFirstname': function(){
                   return this.inputComponent
                       .enterInput("#patient-first", this.customer.firstName)
               },
               'enterLastname': function(){
                   return this.inputComponent
                       .enterInput('#patient-last', this.customer.lastName)
               },
               'toCart': function(){
                   return this.continueSubmit()
               },
               'fillOutEyeInfo' : function(){
                   var self = this;   
                   return this.setLeftEyePower()
                   .then(function(){
                        return self.setRightEyePower()
                        .then(function(){
                            return self.setBCLeftEye()
                            .then(function(){
                                return self.setBCRightEye()
                                .then(function(){
                                    return self.setBoxesLeftEye()
                                    .then(function(){
                                        return self.setBoxesRightEye()
                                        .then(function(){
                                            return self.enterFirstname()
                                            .then(function(){
                                                return self.enterLastname()
                                                .then(function(){
                                                    return self.toCart();
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                   });
               }
           };
           return Product;
       });
