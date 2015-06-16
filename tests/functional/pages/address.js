define([
        '../elements/input',
        '../elements/customDropdown',
        '../../../node_modules/intern/node_modules/dojo/Promise'
], function (Input, Dropdown, Promise) {


    function Address(remote){
        this.remote = remote;
        this.input = new Input(this.remote);
        this.dropdown= new Dropdown(this.remote);
    }

    Address.prototype = {
        constructor: Address,
        'fillShippingForm': function (customer) {
            return Promise.all([
            
            this.dropdown.selectByHTMLValue('dwfrm_singleshipping_shippingAddress_addressFields_states_state' ,'//*[@id="k9knax20xk1jpm4np71ktsj3kuvuiecf"]/div[8]/div[2]/div/div', customer.shipping_state) ,
            this.input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_firstName', customer.firstName),
            this.input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_lastName', customer.lastName),
            this.input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_address1', customer.shipping_address1),
            this.input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_address2', customer.shipping_address2),
            this.input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_city', customer.shipping_city),
            this.input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_zip', customer.shipping_zip),
            this.input.enterInput('#dwfrm_singleshipping_shippingAddress_addressFields_phone', customer.shipping_phone),
            this.input.enterInput('#dwfrm_profile_customer_email', customer.email),
            this.input.enterInput('#dwfrm_profile_login_password', customer.password),
            this.input.enterInput('#dwfrm_profile_login_passwordconfirm', customer.password_confirm)
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
            return this.input.enterInput('#email-address-modal', email);

        },

        'enterPass': function(pass){
            return this.input.enterInput('#loginPassword', pass);
        },

        'submitModalForm': function(){
            return this.remote
                .findById('modal-returning-customer')
                    .submit()
                    .end()
                .sleep(3000)
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
