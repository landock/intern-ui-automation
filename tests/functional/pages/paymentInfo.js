define([
        '../elements/input'
    ],
    function (Input) {

        var Input;
    function PaymentInfo(remote){
        this.remote = remote;
        Input = new Input(remote);
    }

    PaymentInfo.prototype = {
        constructor: PaymentInfo,
        'inputCreditCard': function (cc) {
            return Input.enterInput('dwfrm_billing_paymentMethods_creditCard_number', cc);
        },
        'inputName': function(customer){
           return Input.enterInput('dwfrm_billing_paymentMethods_creditCard_owner', customer.firstName + ' ' + customer.lastName);
        },
        'placeOrder': function(){
            return this.remote
                .sleep(3000)
                .findByCssSelector('#page-checkout > div > div.row.col-4 > div.col.span-3.tablet-portrait-full-width.checkout-toggle > div.row.order-summary > div > div:nth-child(2) > div.col.span-2.align-right.hidden-phone.last > a.btn.btn-orange.btn-trigger-order.submit-cc')
                .click()
                .sleep(3000)
                .end();
        }
    };
    return PaymentInfo;
});