define([
    'intern!object',
    '../../config',
    '../../utility/generator',
    'intern/chai!assert',
    '../customCommands/AllCommands',
    '../../utility/skipRemainingTests'
],
function (registerSuite, config, generator, assert, Command, skip) {
    registerSuite(function(){
        var customer;
        var command;
        var creditCard;
        return {
            name: 'new logged-in customer can pay with Visa during checkout',
            setup: function() {
                command = new Command(this.remote);
                customer = generator.getRandomCustomer();
                creditCard = generator.getCreditCardNumber('visa');
                return command
                .configureNewSession(45000)
                .get(config.URL + '/account');
            },

            beforeEach : function() {
                skip(this);
            },
            
            'test card payment process' : function(){
                return command
                .testCardPayment(customer,creditCard);
            },
            'assert order success' : function(){
                return command
                .findByClassName('thankyou-msg');
            },
            'logout' : function(){
                return command
                .logoutFromHeader()
                .assertLoggedOut()
            }
        };
    });
});
