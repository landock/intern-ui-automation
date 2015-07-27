define([
    'intern!object',
    '../../config',
    '../../utility/generator',
    'intern/chai!assert',
    '../customCommands/AllCommands'
],
function (registerSuite, config, generator, assert, Command) {
    registerSuite(function(){
        var customer;
        var command;
        var prev_dr_name;
        var creditCard;
        return {
            name: 'logged-in customer can pay with American Express during checkout',
            setup: function() {
                command = new Command(this.remote);
                customer = generator.getExistingCustomer(0);
                creditCard = generator.getCreditCardNumber('AmericanExpress');
                return this.remote
                .clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL + '/lens/acuvue-oasys-24');
            },
            'test card payment process' : function(){
                return command
                .testCardPayment(customer,creditCard)
            },
            'assert order success' : function(){
                return command
                .findByClassName('thankyou-msg')
            }
            
        }
    });
});
