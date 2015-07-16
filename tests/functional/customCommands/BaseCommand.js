define([
  'intern/dojo/node!leadfoot/Command'
], 

function (_Command) {
    var proto = BaseCommand.prototype = Object.create(_Command.prototype, {});

    function BaseCommand() {
        _Command.apply(this, arguments);
    }

    proto.constructor = BaseCommand;

    proto.loginFromHeader = function (customer) {
        return new this.constructor(this, function () {
            return this.parent
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
                .findById('logged-in-state');
        });
    };

    // proto.navLogin = function (customer) {
    //     return new this.constructor(this, function() {
    //         return this.parent
    //             .findById('icon-mobile-menu')
    //             .click()
    //             .end()
    //             .findById('btn-ajax-sign-in')
    //             .click()
    //             .end()
    //             .findByCssSelector('#email-address-modal')
    //             .type(customer.email)
    //             .end()
    //             .findByCssSelector('#loginPassword')
    //             .type(customer.password)
    //             .end()
    //             .findByCssSelector('#dwfrm_login_login')
    //             .click()
    //             .end()
    //             .findById('logged-in-state');
    //     });
    // };

    // proto.navLoginCart = function (customer) {
    //     return new this.constructor(this, function() {
    //         return this.parent
    //         .findByXpath('//*[@id="utility"]/li/p/a')
    //         .click()
    //         .end()
    //         .findById('dwfrm_login_username_d0dghfrvhxrv')
    //         .clearValue()
    //         .type(customer.email)
    //         .end()
    //         .findById('#dwfrm_login_password')
    //         .type(customer.password)
    //         .end()
    //         .findByCssSelector('#dwfrm_login_login')
    //         .click()
    //         .end()
    //         .findById('logged-in-state');
    //     });
    // };

    proto.logoutFromHeader = function() {
        return new this.constructor(this, function() {
            return this.parent
            .findByCssSelector('a[title="Logout"]')
            .click()
            .end()
            .findById('logged-out-state');
        });
    };

    proto.mobileLogout = function() {
        return new this.constructor(this, function() {
            return this.parent
            .findAndClick('#dw-sf-control-close-button')
            .findAndClick('#icon-mobile-menu')
            .findAndClick('a[title="Logout"]');
        });
    };

    proto.navigateToUrl = function(url) {
        return new this.constructor(this, function() {
            return this.parent
            .get(url);
        });
    };

    // proto.navLogout = function() {
    //     return new this.constructor(this, function() {
    //         return this.parent
    //         .findById('icon-mobile-menu')
    //         .click()
    //         .end()
    //         .findByXpath('//*[@id="wrapper"]/div[2]/div/ul/li[3]/a')
    //         .click()
    //         .end()
    //         .findById('logged-out-state');
    //      });
    // };

     proto.enterInput = function(id, text) {
        return new this.constructor(this, function() {
            return this.parent
            .execute(function(id2, txt){
                $(id2).removeClass('placeholder').val(txt).trigger('change');
            }, [id, text])
            .end();
        });
     };

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

    return BaseCommand;
});