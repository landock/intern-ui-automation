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
        var first_dr_button = 'div.search-result-page:nth-child(1) > div:nth-child(1) > div:nth-child(4) > p:nth-child(1) > a:nth-child(1)';
        return {
            name: 'logged-in customer can change doctor during checkout',
            setup: function() {
                command = new Command(this.remote);
                customer = generator.getExistingCustomer(0);
                return this.remote
                //.clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000);
                //.get(config.URL)
            },
            'login from header' : function() {
                return command
                .loginFromHeader(customer)
                .assertLoggedIn();
            },
            'click continue to check out': function(){
                return command
                .findAndClick('button[name="dwfrm_cart_checkoutCart"]');
            },
            'fill out doctor info form' : function(){
                return command
                .enterInput('#dwfrm_doctor_doctorName', customer.doctor)
                .setDropdown('#dwfrm_doctor_states_stateUS', customer.doctor_state)
                .findAndClick('a.btn:nth-child(4)');
            },
            'select first doctor': function() {
                return command
                .sleep(1000)
                .findAndClick(first_dr_button);
            },
            'click on edit doctor link' : function(){
                return command
                .findAndClick('.col-9 > div:nth-child(3) > p:nth-child(1) > a:nth-child(1)');
            },
            'get name of current doctor' : function(){
                return command
                .findByCssSelector('div.row:nth-child(2) > div:nth-child(1) > p:nth-child(1)')
                .getVisibleText()
                .then(function(dr_name){
                    prev_dr_name = dr_name.replace('Doctor Name:','').trim();
                    console.log(prev_dr_name);
                });
            },
            'click change doctor button': function(){
                return command
                .findAndClick('#find-different-doc');
            },
            'fill new doctor info' : function(){
                var doc_name = prev_dr_name == 'smith' ? 'Johnson' : 'smith';
                return command
                .enterInput('#dwfrm_doctor_doctorName', doc_name)
                .setDropdown('#dwfrm_doctor_states_stateUS', customer.doctor_state)
                .findAndClick('a.btn:nth-child(4)');
            },
            'select first doctor again': function() {
                return command
                .sleep(1000)
                .findAndClick(first_dr_button);
            },
            'assert that new doctor name is different than previous' : function(){
                return command
                .findByCssSelector('.review-doctor-name')
                .getVisibleText()
                .then(function(new_dr_name){
                    new_dr_name = new_dr_name.replace(/Doctor:\s*/g,'').trim();
                    console.log(new_dr_name);
                    console.log(prev_dr_name);
                    assert.notEqual(new_dr_name,prev_dr_name);
                });
            }
        };
    });
});