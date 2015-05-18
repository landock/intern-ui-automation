define(function (require) {

    function Cart(remote){
        this.remote = remote;
    }

    Cart.prototype = {
        constructor: Cart,
        'continue': function () {
            return this.remote
                .findByCssSelector('button[name="dwfrm_cart_checkoutCart"]')
                .click()
                .end();
        }
    };
    return Cart;
});
