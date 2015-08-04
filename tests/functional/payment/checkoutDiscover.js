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
        var creditCard;
        return {
            name: 'new logged-in customer can pay with Discover during checkout',
            setup: function() {
                command = new Command(this.remote);
                customer = generator.getRandomCustomer();
                creditCard = generator.getCreditCardNumber('discover');
                return command
                .configureNewSession(60000)
                .get(config.URL + '/account');
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
