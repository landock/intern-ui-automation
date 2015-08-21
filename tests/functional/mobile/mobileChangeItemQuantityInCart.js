define([
    'intern!object',
    '../../config',
    '../customCommands/AllCommands',
    '../../utility/skipRemainingTests'
],
function (registerSuite, config, Command, skip) {
    registerSuite(function(){
        var command;
        return {
            name: 'mobile non-logged in customer can change item quantity in cart',
            setup: function() {
                command = new Command(this.remote);
                return command
                .configureNewMobileSession()
                .get(config.URL + '/contact-lens-solution/opti-free-puremoist-drops');
            },

            beforeEach : function() {
                skip(this);
            },

            'click add to cart button': function() {
                return command
                .findAndClick('a[class="btn btn-orange btn-add-cart align-center full-width"]');
            },

            'increase item quantity by one': function(){
                return command
                .setDropdown('#dwfrm_cart_shipments_i0_items_i0_quantity_mobile', '2');
            },

            // this seems icky
            'assert there is more than one item in cart': function() {
                return command
                .findByCssSelector('#dwfrm_cart_shipments_i0_items_i0_quantity_mobile > option[value="1"]')
                .isSelected()
                .then(function(selected) {
                    if(!selected)
                        throw new Error('quantity not changed');
                });
            }
        };
    });
});
