define([
        '../elements/input',
        '../elements/customDropdown',
        '../../../node_modules/intern/node_modules/dojo/Promise'
], function (Input, Dropdown, Promise) {

    var input, dropdown;

    function Address(remote){
        this.remote = remote;
        input = new Input(this.remote);
        dropdown= new Dropdown(this.remote);
    }

    Address.prototype = {
        constructor: Address,
        'fillShippingForm': function (customer) {
            return Promise.all([
            
            dropdown.selectByHTMLValue('dwfrm_singleshipping_shippingAddress_addressFields_states_state' ,'//*[@id="k9knax20xk1jpm4np71ktsj3kuvuiecf"]/div[8]/div[2]/div/div', customer.shipping_state) ,
            input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_firstName', customer.firstName),
            input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_lastName', customer.lastName),
            input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_address1', customer.shipping_address1),
            input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_address2', customer.shipping_address2),
            input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_city', customer.shipping_city),
            input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_zip', customer.shipping_zip),
            input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_phone', customer.shipping_phone),
            input.enterInput('#dwfrm_profile_customer_email', customer.email),
            input.enterInput('#dwfrm_profile_login_password', customer.password),
            input.enterInput('#dwfrm_profile_login_passwordconfirm', customer.password_confirm)
            ]);
        },

        'continueToDoctor': function(){
            return this.remote
                .findByCssSelector('.btn-orange')
                .click()
                .end();
        },
        
        'signIn': function(){
            return this.remote
                .findByCssSelector('a[data-modal-id="modal-sign-in"]')
                .click()
                .end();
        },

        'enterEmail': function(email){
            return input.enterInput('#email-address-modal', email);

        },

        'enterPass': function(pass){
            return input.enterInput('#loginPassword', pass);
        },

        'submitModalForm': function(){
            return this.remote
                .findById('dwfrm_login_login')
                .click()
                .end()
                .findByCssSelector('.tab-header h2')
                .getVisibleText()
                .then(function(header){
                    return header;
                });
        },

        'checkAddress': function(){
            return this.remote
                .findByCssSelector('.tab-header > h2')
                .getVisibleText()
                .then(function(txt){
                    return txt;
                });
        }
    };	      

    return Address;
});
