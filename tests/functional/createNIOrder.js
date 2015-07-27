define([
    'intern!object',
    '../utility/generator',
    '../config',
    'intern/chai!assert',
    './customCommands/AllCommands'
],

function (registerSuite, generator, config, assert, Command) {
    registerSuite(function() {
        var customer;
        var command;

        return {
            name: 'Create NI Order',
            setup: function(){
                command = new Command(this.remote);
                customer = generator.getRandomCustomer();
                return command.configureNewSession()
                .get(config.URL + '/lens/acuvue-oasys-24');
            },
            'Set prescription info':function() {
                return command
                .fillInfo()
            },
            'Continue to address page': function() {
                return command
                .waitForDeletedByCssSelector('.prod-details-specs')
                .findAndClick('.btn-orange');

            },
            'fill out address shipping form': function(){
                return command
                .fillCartAddressForm(customer)
                .findAndClick('.btn-orange');
            },
            'Fill out doctor info': function(){
                return command
                .enterInput('#dwfrm_doctor_doctorName', customer.doctor)
                .setDropdown('#dwfrm_doctor_states_stateUS', customer.doctor_state)
                .findAndClick('a[href="ajax-doctor-results.html"]')
                .sleep(1000)
                .findAndClick('.last a');
            },
            'Place order': function(){
                return command
                .findByCssSelector('#dwfrm_billing_paymentMethods_creditCard_number')
                .type(customer.credit_card)
                .end()
                .findByCssSelector('#dwfrm_billing_paymentMethods_creditCard_owner' )
                .type(customer.last_name)
                .end()
                //.enterInput('#dwfrm_billing_paymentMethods_creditCard_owner', customer.last_name)
                //.sleep(3000)
                //.enterInput('#dwfrm_billing_paymentMethds_creditCard_number', customer.credit_card)
                .findAndClick('.btn-trigger-order');
            },
            'Did the order go through': function() {
                return command
                    .setFindTimeout(8000)
                    .waitForDeletedByCssSelector('#dwfrm_billing_paymentMethods_creditCard_owner')
                    .assertElementText('h2.thankyou-msg', 'Thank you for your order');
            }
        };
    });
});
