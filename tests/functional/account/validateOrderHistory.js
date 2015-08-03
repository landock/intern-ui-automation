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
            name: 'new customer can view order history',
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
                .enterInput('#dwfrm_billing_paymentMethods_creditCard_number',creditCard)
                .setDropdown('#dwfrm_billing_paymentMethods_creditCard_year','2025')
                .enterInput('#dwfrm_billing_paymentMethods_creditCard_owner', customer.first_name +' '+customer.last_name)
                .findAndClick('.submit-cc')
                .waitForDeletedByClassName('modal-wrap');
            },
            'go to Order History' : function(){
                return command
                .get(config.URL+'/order-history')       
            },
            'click on view details' : function(){
                return command
                .findAndClick('.arrow-down-before, .summary-detail-toggler ,.ajax-order-history ,.ajax-success')
            },
            'assert that contacts are in previous order' : function(){
                return command
                .assertElementText('#order-history-container > div.order-item-container.active > div.order-item-details > div.row.col-9.products.margin-top-small > div.col.span-6.col-full-width-mobile > p > strong','Acuvue Oasys 24pk')
            }
        }
    });
});
