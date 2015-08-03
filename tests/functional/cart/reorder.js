define([
    'intern!object',
    '../../config',
    '../../utility/generator',
    'intern/dojo/node!leadfoot/helpers/pollUntil',
    '../customCommands/AllCommands'
],
function (registerSuite, config, generator, pollUntil, Command) {
    registerSuite(function(){
        var customer
        var creditCard;
        var command;
        return {
            name: 'new logged in customer can reorder',
            setup: function() {
                customer = generator.getRandomCustomer();
                command = new Command(this.remote);
                creditCard = generator.getCreditCardNumber('MasterCard');
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
            'complete placing order' : function(){
                return command
                .fillDrInfo(customer)
                .enterInput('#dwfrm_billing_paymentMethods_creditCard_number', creditCard)
                .setDropdown('#dwfrm_billing_paymentMethods_creditCard_year', '2025')
                .enterInput('#dwfrm_billing_paymentMethods_creditCard_owner', customer.first_name + ' ' + customer.last_name)
                .findAndClick('.submit-cc')
                .waitForDeletedByClassName('modal-wrap');
            },
            'select order to reorder and continue' : function(){
                return command
                .get(config.URL + '/account')
                .clickOnStylizedFormElement('#dwfrm_dashboarditems > div.patient-orders > div > div.row.account-user-content > div > div.row.recent-pres-header > div > label')
                .findAndClick('#btn-reorder-rx')
            },
            'click continue' : function(){
                return command
                .findAndClick('button[name="dwfrm_cart_checkoutCart"]')
            },
            'click place my order' : function(){
                return command
                .findAndClick('.submit-cc')
            },
            'assert order success' : function(){
                return command
                .findByClassName('thankyou-msg')
            },
        }
    });
});
