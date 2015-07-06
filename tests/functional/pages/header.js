define([
	'../../utility/generator',
	'../../config',
	'../elements/input'
],

function (generator, config, Input) {

	function Header(remote) {
		this.remote = remote;
		this.customer = generator.getExistingCustomer(config.existingId);
		this.input = new Input(this.remote);
	}

	Header.prototype = {
		constructor: Header,
		'login' : function () {
			return this.remote
			.findByCssSelector('a[data-flyout-id="flyout-sign-in"]')
			.click()
			.end()
			.findByCssSelector('#email-address-modal')
			.type(this.customer.email)
			.end()
			.findByCssSelector('#loginPassword')
            .type(this.customer.password)
            .end()
            .findByCssSelector('#dwfrm_login_login')
            .click()
            .end()
            .findById('logged-in-state');
		},

		'logout' :function() {
			return this.remote
			.findByCssSelector('a[title="Logout"]')
			.click()
			.end()
			.findById('logged-out-state');
		}
	};
	return Header;
});