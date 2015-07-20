define([
    'intern!object',
    '../config'
],
function (registerSuite, config) {
    registerSuite(function(){

        return {
            name: 'Add Solution To Cart',
            setup: function(){

                return this.remote
                .clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL);
            },

            'go to products page' : function() {
                return this.remote
                .findByXpath('//*[@id="wrapper"]/section[2]/div/ul/li[3]/a/img')
                .click()
                .end()
            },

            'click on solution' : function() {
                return this.remote
                .findByXpath('//*[@id="bciGkiaaisQ9aaaadcGOEU5fNT"]/div/img')
                .click()
                .end()
            },

            'add to cart' : function() {
                return this.remote
                .findByXpath('//*[@id="product-quantity"]/div[2]/p/a')
                .click()
                .end()
            },

            'remove cart item' : function() {
                return this.remote
                .findByXpath('//*[@id="cart-items-form"]/div[1]/div/div[2]/div[2]/div[1]/div[2]/p/button[2]')
                .click()
                .end()
                .sleep(10000);
            }
        };
    });
});