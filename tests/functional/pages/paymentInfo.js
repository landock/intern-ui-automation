define([ '../elements/input',
    'intern/dojo/node!leadfoot/helpers/pollUntil',
    '../../utility/functionalTestUtils'
    ],
function (Input, pollUntil, utils) {

    function PaymentInfo(remote){
        this.remote = remote;
        this.input = new Input(this.remote);
    }

    PaymentInfo.prototype = {
        constructor: PaymentInfo,
        'inputCreditCard': function (cc) {
            return this.input
                .enterNonPlaceholderInput('#dwfrm_billing_paymentMethods_creditCard_number', cc);
        },
        'inputName': function(customer){
            return this.input
                .enterInput('#dwfrm_billing_paymentMethods_creditCard_owner', customer.firstName + ' ' + customer.lastName);
        },
        'placeOrder': function(){
            return this.remote
                .findByCssSelector('.hidden-phone.last .submit-cc')
                .click()
                .end()
                .then(pollUntil(utils.elementVisibleByClass, ['thankyou-msg'], 30000, 700))
                .then(function (val) {
                    return val.click();
                }, function (err) {
                    return;
                });
        }
    };
    return PaymentInfo;
});
