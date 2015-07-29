define([
    'intern/dojo/node!leadfoot/Command',
    'intern/chai!assert',
    '../../config'
],

function (_Command, assert, config) {
    var proto = BaseCommand.prototype = Object.create(_Command.prototype, {});

    function BaseCommand() {
        _Command.apply(this, arguments);
    }

    proto.constructor = BaseCommand;

    proto.setAllTimeoutLengths = function(timeoutLength) {
        return new this.constructor(this, function () {
            var defaultTimeoutLength = timeoutLength || 60000;
            var findTimeoutLength = ( defaultTimeoutLength - ( ( 10/100 ) * defaultTimeoutLength ) );
            return this.parent
            .setTimeout('script', defaultTimeoutLength)
            .setTimeout('page load', defaultTimeoutLength)
            .setFindTimeout(findTimeoutLength);
        });
    };

    proto.configureNewSession = function(timeout) {
        return new this.constructor(this, function () {
            return this.parent
            .setAllTimeoutLengths(timeout)
            .clearCookies();
        });
    };

    proto.configureNewMobileSession = function(timeout) {
        return new this.constructor(this, function() {
            return this.parent
            .configureNewSession(timeout)
            .mobileClearAppAdPage()
            .removeDemandWareWidget();
        });
    };

    proto.loginFromHeader = function (customer) {
        return new this.constructor(this, function () {
            return this.parent
            // .sleep(1000)
            .findAndClick('a[data-flyout-id="flyout-sign-in"]')
            .enterInput('#email-address-modal', customer.email)
            .enterInput('#loginPassword', customer.password)
            .findAndClick('#dwfrm_login_login');
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
            // .sleep(1000)
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
            // .sleep(1000) // because staleReferenceError
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
            // .sleep(1000) // because staleReferenceError
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

    proto.setDesktopPowerDropdown = function (id, value) {
        return new this.constructor(this, function () {
            return this.parent
            .execute(function(id, value){
                var elem = $(id);
                elem.parent().siblings().find('li a[data-value="'+value+'"]').click();
            }, [id, value]);
        });
    };

    proto.setDropdown = function(id, value) {
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
            .sleep(1000) // because staleElementReferenceException
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
                $('#__DW__SFToolkit').contents().find('#dw-sf-control-close-button').click();
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
            .findAndClick('#dwfrm_login_login');
        });
     };
    
    proto.createNewAccount = function(customer) {
        return new this.constructor(this, function() {
            return this.parent
            .findAndClick('label[for="new"]')
            .enterInput('#email-address', customer.email)
            .enterInput('#dwfrm_profile_login_password', customer.password)
            .enterInput('#dwfrm_profile_login_passwordconfirm', customer.password_confirm)
            .findAndClick('button[name="dwfrm_profile_confirm"]');
            });
     };

    proto.mobileClearAppAdPage = function() {
        return new this.constructor(this, function() {
            return this.parent
            .get(config.URL + '/account')
            .findAndClick('div[class="no-thanks"]');
        });
    };

    return BaseCommand;
});
