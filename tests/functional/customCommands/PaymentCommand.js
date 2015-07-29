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
            .enterInput('#dwfrm_billing_paymentMethods_creditCard_number',creditCardNo)
            .setDropdown('#dwfrm_billing_paymentMethods_creditCard_year','2025')
            .enterInput('#dwfrm_billing_paymentMethods_creditCard_owner', customer.first_name +' '+customer.last_name)
            .findAndClick('.submit-cc')
            .waitForDeletedByClassName('modal-wrap');
         });
    };

    return PaymentCommand;
});
