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
                .findByXpath('//*[@id="order-information"]/div[1]/div[3]/div/div[2]/div/a[1]')
                .click()
                .sleep(3000);
        }
    };
    return PaymentInfo;
});