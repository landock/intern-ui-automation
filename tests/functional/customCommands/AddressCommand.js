define([
	'./BaseCommand'
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
			.clearForm('#edit-address-form')
			.sleep(1000)
			.end()
			.enterInput('#dwfrm_profile_address_address1', customer.shipping_address1)
			.enterInput('#dwfrm_profile_address_address2', customer.shipping_address2)
			.enterInput('#dwfrm_profile_address_city',  customer.shipping_city)
			.enterInput('#dwfrm_profile_address_zip', customer.shipping_zip)
			.enterInput('#dwfrm_profile_address_phone', customer.shipping_phone)
			.enterInput('#dwfrm_profile_address_firstname', customer.firstName)
			.enterInput('#dwfrm_profile_address_lastname', customer.lastName);
		});
	};

	return AddressCommand;
});


