define([
    'intern!object',
    '../../config',
    '../../utility/generator',
    'intern/dojo/node!leadfoot/helpers/pollUntil',
    '../customCommands/AllCommands'
],
function (registerSuite, config, generator, pollUntil, Command) {
    registerSuite(function(){
        var customer
        var creditCard;
        var command;
        return {
            name: 'customer can reorder',
            setup: function() {
                customer = generator.getExistingCustomer(4);
                command = new Command(this.remote);
                //creditCard = generator.getCreditCardNumber('MasterCard');
                return command
                .configureNewSession(60000)
                .get(config.URL + '/account');
            },
            
            'log in': function(){
                return command
                .loginFromHeader(customer);
            },
            
            'select order to reorder and continue' : function(){
                return command
                .clickOnStylizedFormElement('#dwfrm_reorder > div.reorder-container > div:nth-child(1) > div.row.col-4.reorder-item label')
                .findAndClick('#btn-reorder-rx')
            },
            
            'click continue' : function(){
                return command
                .findAndClick('button[name="dwfrm_cart_checkoutCart"]')
            },
            
            'click place my order' : function(){
                return command
                .findAndClick('.submit-cc')
            },
            
            'assert order success' : function(){
                return command
                .findByClassName('thankyou-msg')
            },
        }
    });
});
