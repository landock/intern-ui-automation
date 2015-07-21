define([
    'intern!object',
    '../../config',
    '../../utility/generator',
    '../customCommands/AllCommands'
],
function (registerSuite, config, generator, Command) {
    registerSuite(function(){
        var customer;
        var command;
        return {
            name: 'logged-in customer can change doctor during checkout',
            setup: function() {
                command = new Command(this.remote);
                customer = generator.getExistingCustomer(0);
                return this.remote
                //.clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                //.get(config.URL)
            },
            'login from header' : function() {
                return command
                .loginFromHeader(customer);
            },
            'click continue to check out': function(){
                return command
                .findAndClick('button[name="dwfrm_cart_checkoutCart"]')
                .enterInput('#dwfrm_doctor_doctorName',customer.doctor)
                .setDropdown('#dwfrm_doctor_states_stateUS',customer.doctor_state)
                .sleep(1000)
            },
            /*'fill out doctor info form' : function(){
                return command
                .enterInput('#dwfrm_doctor_doctorName',customer.doctor)
                .setDropdown('#dwfrm_doctor_states_stateUS',customer.doctor_state)
                .findAndClick('a.btn-find-doctors:first')
                //.sleep(5000)
            }*/
        }
    });
});
