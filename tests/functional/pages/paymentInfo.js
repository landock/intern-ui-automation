define([
        '../elements/input'
    ],
    function (Input) {

        var input;
    function PaymentInfo(remote){
        this.remote = remote;
        input = new Input(remote);
    }

    PaymentInfo.prototype = {
        constructor: PaymentInfo,
        'inputCreditCard': function (cc) {
            return input.enterInput('#dwfrm_billing_paymentMethods_creditCard_number', cc);
        },
        'inputName': function(customer){
           return input.enterInput('#dwfrm_billing_paymentMethods_creditCard_owner', customer.firstName + ' ' + customer.lastName);
        },
        'placeOrder': function(){
            return this.remote
                .sleep(3000)
                .findByCssSelector('.hidden-phone.last .submit-cc')
                .click()
                .sleep(3000)
                .end();
        }
    };
    return PaymentInfo;
});