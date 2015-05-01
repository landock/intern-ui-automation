define([
        '../elements/input',
        '../elements/customDropdown',
        '../../../node_modules/intern/node_modules/dojo/promise/all'
        ], function (Input, Dropdown, all) {
	var Input;
	var Dropdown;
	
	function Address(remote){
		this.remote = remote;
		Input = new Input(remote);
		Dropdown = new Dropdown(remote);
	}
	
	Address.prototype = {
			constructor: Address,
			'fillShippingForm': function (customer) {
				return all([
	        	Input.enterInput('dwfrm_singleshipping_shippingAddress_addressFields_firstName', customer.firstName),
	        	Input.enterInput('dwfrm_singleshipping_shippingAddress_addressFields_lastName', customer.lastName),
	        	Input.enterInput('dwfrm_singleshipping_shippingAddress_addressFields_address1', customer.shipping_address1),
	        	Input.enterInput('dwfrm_singleshipping_shippingAddress_addressFields_address2', customer.shipping_address2),
	        	Input.enterInput('dwfrm_singleshipping_shippingAddress_addressFields_city', customer.shipping_city),
	        	Input.enterInput('dwfrm_singleshipping_shippingAddress_addressFields_zip', customer.shipping_zip),
	        	Input.enterInput('dwfrm_singleshipping_shippingAddress_addressFields_phone', customer.shipping_phone),
	        	Input.enterInput('dwfrm_profile_customer_email', customer.email),
	        	Input.enterInput('dwfrm_profile_login_password', customer.password),
	        	Input.enterInput('dwfrm_profile_login_passwordconfirm', customer.password_confirm),
	        	Dropdown.selectByHTMLValue('dwfrm_singleshipping_shippingAddress_addressFields_states_state' ,'//*[@id="k9knax20xk1jpm4np71ktsj3kuvuiecf"]/div[8]/div[2]/div/div', customer.shipping_state)
	        	]);
			},
            'continueToDoctor': function(){
                    return this.remote
                    .findByCssSelector('.btn-orange')
                        .click()
                        .end()
                        .sleep(3000)
                    .findByCssSelector('#page-checkout .doctor-header-row.alpha > div > h2')
                        .getVisibleText()
                    .then(function(txt){
                        return txt;
                    });
            }
	};	      
	return Address;
});