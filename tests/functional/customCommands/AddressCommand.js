define([
    './BaseCommand',
],

function(BaseCommand) {

    var proto = AddressCommand.prototype = Object.create(BaseCommand.prototype, {});

    function AddressCommand() {
        BaseCommand.apply(this, arguments);
    }

    proto.constructor = AddressCommand;

    proto.fillAddressForm = function(customer) {
        return new this.constructor(this, function() {
            return this.parent
            .enterInput('input[id$="address1"]', customer.shipping_address1)
            .enterInput('input[id$="address2"]', customer.shipping_address2)
            .enterInput('input[id$="city"]',  customer.shipping_city)
            .enterInput('input[id$="zip"]', customer.shipping_zip)
            .enterInput('input[id$="phone"]', customer.shipping_phone)
            .enterInput('input[id$="firstname"],input[id$="firstName"]', customer.first_name)
            .enterInput('input[id$="lastname"],input[id$="lastName"]', customer.last_name)
            .setDropdown('select[id$="state"]', customer.shipping_state);
        });
    };

    proto.fillCartAddressForm = function(customer) {
        return new this.constructor(this, function() {
            return this.parent
            .fillAddressForm(customer)
            .enterInput('input[id$="email"]', customer.email)
            .enterInput('input[id$="password"]', customer.password)
            .enterInput('input[id$="passwordconfirm"]', customer.password);
        });
    };

    proto.fillEditAddressForm = function(customer) {
        return new this.constructor(this, function() {
            return this.parent
            .clearForm('#edit-address-form')
            .fillAddressForm(customer)
            .findAndClick('button[name="dwfrm_profile_address_edit"]')
            .waitForDeletedByCssSelector('#edit-address-form');
        });
    };

    proto.fillAddNewAddressForm = function(customer) {
        return new this.constructor(this, function() {
            return this.parent
            .clearForm('#edit-address-form')
            .fillAddressForm(customer)
            .findAndClick('button[name="dwfrm_profile_address_create"]')
            .waitForDeletedByCssSelector('#edit-address-form');
        });
    };

    return AddressCommand;
});


