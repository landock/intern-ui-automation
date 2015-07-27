define([
  'intern/dojo/node!leadfoot/Command',
  'intern/chai!assert'
], 

function (_Command, assert) {
    var proto = BaseCommand.prototype = Object.create(_Command.prototype, {});

    function BaseCommand() {
        _Command.apply(this, arguments);
    }

    proto.constructor = BaseCommand;

    proto.loginFromHeader = function (customer) {
        return new this.constructor(this, function () {
            return this.parent
                .findAndClick('a[data-flyout-id="flyout-sign-in"]')
                .enterInput('#email-address-modal', customer.email)
                .enterInput('#loginPassword', customer.password)
                .findAndClick('#dwfrm_login_login');
                // .findById('#logged-in-state');
        });
    };
    
    proto.assertLoggedIn = function () {
        return new this.constructor(this, function () {
            return this.parent
            .findById('logged-in-state');
        });
    };

    proto.logoutFromHeader = function() {
        return new this.constructor(this, function() {
            return this.parent
            .findAndClick('a[title="Logout"]');
        });
    };
    
    proto.assertLoggedOut = function () {
        return new this.constructor(this, function () {
            return this.parent
            .findById('logged-out-state');
        });
    };

    proto.mobileLogin = function(customer) {
        return new this.constructor(this, function () {
            return this.parent
            .findAndClick('#icon-mobile-menu')
            .findAndClick('#btn-ajax-sign-in')
            .enterInput('#email-address-modal', customer.email)
            .enterInput('#loginPassword', customer.password)
            .findAndClick('#dwfrm_login_login');
            // would like to 'assert' success with findById like in loginFromHeader()
            // #logged-in-state exists but seems to only be findable if the mobile menu is open
        });
    };

    proto.mobileLogout = function() {
        return new this.constructor(this, function() {
            return this.parent
            .findAndClick('#icon-mobile-menu')
            .findAndClick('a[title="Logout"]');
            // same as above except want to findById with #logged-out-state
        });
    };

    proto.enterInput = function(id, text) {
        return new this.constructor(this, function() {
            return this.parent
            .execute(function(id2, txt){
                $(id2).removeClass('placeholder').val(txt).trigger('change');
            }, [id, text])
            .end();
        });
     };

    //probably refactor
    // this works for all desktop drop-downs and non power mobile drop-downs
    proto.setDropdown = function (id, value) {
        return new this.constructor(this, function () {
            return this.parent
                .execute(function(id, value){
                    var elem = $(id);
                    if(id.indexOf('Power') != -1){
                        elem.parent().siblings().find('li a[data-value="'+value+'"]').click();
                    }
                    else{
                        elem.val(value).change();
                    }
                }, [id, value]);

         });
    };
    
    // this works for all drop-downs except desktop power drop-downs.
    proto.mobileSetPowerDropDown = function(id, value) {
        return new this.constructor(this, function() {
            return this.parent
            .execute(function(id, value) {
                var elem = $(id);
                elem.val(value).change();
            }, [id, value]);
        });
    };
    
    proto.findAndClick = function(id) {
        return new this.constructor(this, function() {
            return this.parent
            .findDisplayedByCssSelector(id)
            .click();
        });
     };

    proto.clearForm = function(formId) {
        return new this.constructor(this, function() {
            return this.parent
            .findAllByCssSelector(formId + ' input[type="text"],' + formId + ' input[type="tel"]')
            .then(function(inputs) {
                for (var i = 0; i < inputs.length; i++) {
                    inputs[i].clearValue();
                }
            });
        });
     };
    
     proto.assertElementText = function(selector,text) {
        return new this.constructor(this, function() {
            return this.parent
            .findByCssSelector(selector)
            .getVisibleText()
            .then(function(elem_text){
                assert.include(elem_text, text);
            });
        });
     };
    
     proto.removeDemandWareWidget = function() {
        return new this.constructor(this, function() {
            return this.parent
            .execute(function() {
                $('#__DW__SFToolkit').remove();
            },
            []);
        });
     };

    proto.signInFromCart = function(customer) {
        return new this.constructor(this, function() {
            return this.parent
            .findAndClick('a[data-modal-id="modal-sign-in"]')
            .enterInput('#email-address-modal', customer.email)
            .enterInput('#loginPassword', customer.password)
            .findAndClick('#dwfrm_login_login')
            });
     };


    return BaseCommand;
});
