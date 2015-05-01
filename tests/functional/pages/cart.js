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
                .sleep(3000)
                .findByCssSelector('#page-checkout > div > div.row.tab-header.no-border > h2')
                .getVisibleText()
                .then(function(txt){
                    return txt;
                });
        }
    };
    return Cart;
});