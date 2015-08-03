define([
    'intern!object',
    '../../config',
    '../../utility/generator',
    'intern/chai!assert',
    'intern/dojo/node!leadfoot/helpers/pollUntil',
    '../customCommands/AllCommands'
],
function (registerSuite, config, generator, assert, pollUntil, Command) {
    registerSuite(function(){
        var customer;
        var command;
        var paypal;
        return {
            name: 'new logged-in customer can pay with PayPal during checkout',
            setup: function() {
                command = new Command(this.remote);
                customer = generator.getRandomCustomer();
                paypal = generator.getPayPalLogin();
                return command
                .configureNewSession(60000)
                .get(config.URL + '/account');
            },
            
            'create new account': function(){
                return command
                .createNewAccount(customer);
            },
            
            'place contact lenses in cart and click continue' :function(){
                return command
                .get(config.URL + '/lens/acuvue-oasys-24')
                .fillInfo()
                .findAndClick('button[name="dwfrm_cart_checkoutCart"]')
            },
            
            'fill out address info' :function(){
                return command
                .fillAddressForm(customer)
                .findAndClick('button[name="dwfrm_billing_save"]')
            },
            
            'select PayPal as payment method' : function(){
                return command
                .fillDrInfo(customer)
                .clickOnStylizedFormElement('.paypal label')
                //findAndClick doesn't work here due to custom radio button implementation
                .execute(function(){
                    $('#ContactsPayPal')[0].click();
                })
            },
            
            //TODO: use method in Base once it's added
            'complete PayPal Payment process' : function(){
                return command
                .findAndClick('#loadLogin')
                .findByCssSelector('#login_email')
                .type(paypal.email)
                .end()
                .findByCssSelector('#login_password')
                .type(paypal.password)
                .end()
                .findAndClick('#submitLogin')
                .sleep(1000) //give time for fade up animation to finish so it doesn't cover button
                .findAndClick('#continue')
                .findAndClick('.submit-cc')
                .waitForDeletedByClassName('modal-wrap');
            },
            
            //TODO: use method in Base once it's added
            'assert order success' : function(){
                return command
                .findByClassName('thankyou-msg')
            }
        }
    });
});
