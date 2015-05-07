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
                .setFindTimeout(25000)
                .findByCssSelector('.hidden-phone.last .submit-cc')
                .click()
                .end();
        }
    };
    return PaymentInfo;
});