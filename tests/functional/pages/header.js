define([

],

function () {

	function Header(remote) {
		this.remote = remote;
	}

	Header.prototype = {
		constructor: Header,
		'login' : function (customer) {
			//ASSERT LOGGED OUT?
			return this.remote
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
		},

		'logout' :function() {
			//ASSERT LOGGED IN?
			return this.remote
			.findByCssSelector('a[title="Logout"]')
			.click()
			.end()
			.findById('logged-out-state');
		}
	};
	return Header;
});