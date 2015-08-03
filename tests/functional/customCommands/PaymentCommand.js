define([
    './BaseCommand'
],

function(BaseCommand){
    var proto = PaymentCommand.prototype = Object.create(BaseCommand.prototype, {});
    
    function PaymentCommand() {
	   BaseCommand.apply(this, arguments);
    }
    
    proto.constructor = PaymentCommand;
    
    //must be run on /lens/acuvue-oasys-24
    proto.testCardPayment = function (customer, creditCardNo) {
        return new this.constructor(this, function () {
            return this.parent
            .fillInfo()
            .findAndClick('button[name="dwfrm_cart_checkoutCart"]')
            .signInFromCart(customer)
            .assertLoggedIn()
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
            .signInFromCart(customer)
            .assertLoggedIn()
            .mobileFillDrInfo(customer)
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
