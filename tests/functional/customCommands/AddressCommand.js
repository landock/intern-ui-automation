define([
	'./BaseCommand',
	'intern/dojo/node!leadfoot/helpers/pollUntil',
	'../../utility/pollUtil'
],

function(BaseCommand, pollUntil, pollUtil) {

	var proto = AddressCommand.prototype = Object.create(BaseCommand.prototype, {});

	function AddressCommand() {
		BaseCommand.apply(this, arguments);
	}

	proto.constructor = AddressCommand;

	proto.fillAddressForm = function(customer) {
		return new this.constructor(this, function() {
			return this.parent
			.clearForm('#edit-address-form')
			.enterInput('#dwfrm_profile_address_address1', customer.shipping_address1)
			.enterInput('#dwfrm_profile_address_address2', customer.shipping_address2)
			.enterInput('#dwfrm_profile_address_city',  customer.shipping_city)
			.enterInput('#dwfrm_profile_address_zip', customer.shipping_zip)
			.enterInput('#dwfrm_profile_address_phone', customer.shipping_phone)
			.enterInput('#dwfrm_profile_address_firstname', customer.first_name)
			.enterInput('#dwfrm_profile_address_lastname', customer.last_name)
			.selectState(customer.shipping_state)
			.findAndClick('button[name="dwfrm_profile_address_edit"]')
			// .then(pollUntil(function() {
			// 	var modal = document.getElementById('edit-address-form');
			// 	return modal === null ? true : null;
			// }, [], 1000));
			.then(pollUtil.pollUntilElementRemoved(this.parent, 'edit-address-form', 1000));
		});
	};

	proto.selectState = function(state) {
		return new this.constructor(this, function() {
			return this.parent
			.execute(function(state2) {
				$('#dwfrm_profile_address_states_state').val(state2);
			}, [state])
			.end();
		});
	};

	return AddressCommand;
});


