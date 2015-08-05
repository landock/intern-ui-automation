define([
    './BaseCommand',
    '../../config'
],

function(BaseCommand,config){
    var proto = PaymentCommand.prototype = Object.create(BaseCommand.prototype, {});
    
    function PaymentCommand() {
	   BaseCommand.apply(this, arguments);
    }
    
    proto.constructor = PaymentCommand;
    
    //must be run on /account
    proto.testCardPayment = function (customer, creditCardNo) {
        return new this.constructor(this, function () {
            return this.parent
            .createNewAccount(customer)
            .assertLoggedIn()
            .get(config.URL + '/lens/acuvue-oasys-24')
            .fillInfo()
            .findAndClick('button[name="dwfrm_cart_checkoutCart"]')
            .fillAddressForm(customer)
            .findAndClick('button[name="dwfrm_billing_save"]')
            .fillDrInfo(customer)
            //click on Credit Card radio in case PayPal is selected
            .clickOnStylizedFormElement('.payment-method label[for="review-credit-card"]')
            .setDropdown('#CreditCardChoose','newCreditCard')
            .enterInput('#dwfrm_billing_paymentMethods_creditCard_number',creditCardNo)
            .setDropdown('#dwfrm_billing_paymentMethods_creditCard_year','2025')
            .enterInput('#dwfrm_billing_paymentMethods_creditCard_owner', customer.first_name +' '+customer.last_name)
            .findAndClick('.submit-cc')
            .waitForDeletedByClassName('modal-wrap');
         });
    };

    proto.mobileTestCardPayment = function (customer, creditCardNo) {
        return new this.constructor(this, function () {
            return this.parent
            .findAndClick('#enterManuallyButton')
            .mobileFillInfo()
            .findAndClick('button[name="dwfrm_cart_checkoutCart"]')
            .mobileFillDrInfo(customer)
            .findAndClick('#order-information > div.row.col-5.review-top.borders-full > div.col.span-2.last > div > div:nth-child(1) > div > div > div > div > div.row.col-12')
            .setDropdown('#CreditCardChoose', 'newCreditCard')
            .findByCssSelector('#dwfrm_billing_paymentMethods_creditCard_number')
            .clearValue()
            .end()
            .enterInput('#dwfrm_billing_paymentMethods_creditCard_number', creditCardNo)
            .sleep(3000)
            .setDropdown('#dwfrm_billing_paymentMethods_creditCard_year','2025')
            .findByCssSelector('#dwfrm_billing_paymentMethods_creditCard_owner')
            .clearValue()
            .end()
            .enterInput('#dwfrm_billing_paymentMethods_creditCard_owner', customer.first_name +' '+customer.last_name)
            .findAndClick('.submit-cc')
            .waitForDeletedByClassName('modal-wrap');
         });
    };

    return PaymentCommand;
});
