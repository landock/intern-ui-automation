define([
    'intern!object',
    'intern/chai!assert',
    // 'intern/dojo/node!leadfoot/helpers/pollUntil',
    '../../utility/generator',
    '../../config',
    '../elements/input',
    // '../utility/functionalTestUtils',
    // '../../../node_modules/intern/node_modules/dojo/Promise'
],

function (registerSuite, assert, generator, config, Input) {
	registerSuite(function(){
		var customer;
		var input;
		return {
			name: 'Sign in from Home Page',
			setup: function() {
				customer = generator.getExistingCustomer(config.existingId);
				input = new Input(this.remote);
				return this.remote
				.setTimeout('script', 60000)
				.setTimeout('page load', 60000)
				.setFindTimeout(50000)
				.get(config.URL);
			},

			'click in-line sign in button' : function() {
				return this.remote
				.findByCssSelector('a[data-inline-id="inline-sign-in"]')
				.click();
			},

			'fill in email field' : function() {
				return input
				.enterInput('#email-address-modal', customer.email);
			},

			'fill in password field' : function() {
				return input
				.enterInput('#loginPassword', customer.password);
			},

			'submit login form' : function() {
				// console.log(this);
				return this.remote
				.findById('dwfrm_login_login')
				.click()
				.end()
				.findById('logged-in-state');
				// .getVisibleText()
				// .then(function(txt) {
				// 	console.log(txt);
				// 	assert.include(txt, 'Welcome back test', 'User has logged on successfully');
				// });
			}
		};
	});
});