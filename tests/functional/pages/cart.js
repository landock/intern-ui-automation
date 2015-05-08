define(function (require) {

    function Cart(remote){
        this.remote = remote;
    }

    Cart.prototype = {
        constructor: Cart,
        'continueToAddress': function () {
            return this.remote
                .findByName('dwfrm_cart_checkoutCart')
                .click()
                .end()
                .findByCssSelector('.tab-header > h2')
                .getVisibleText()
                .then(function(txt){
                    return txt;
                });
        }
    };
    return Cart;
});
