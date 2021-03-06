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
        var prev_dr_name;
        return {
            name: 'new logged-in customer can change doctor during checkout',
            setup: function() {
                command = new Command(this.remote);
                customer = generator.getRandomCustomer();
                return command
                .configureNewSession()
                .get(config.URL + '/account');
            },

            beforeEach: function() {
                skip(this);
            },

            'create new account': function(){
                return command
                .createNewAccount(customer);
            },
            'place contact lenses in cart and click continue' :function(){
                return command
                .get(config.URL + '/lens/acuvue-oasys-24')
                .fillInfo()
                .findAndClick('button[name="dwfrm_cart_checkoutCart"]');
            },
            'fill out address info' :function(){
                return command
                .fillAddressForm(customer)
                .findAndClick('button[name="dwfrm_billing_save"]');
            },
            'fill out Dr info form' : function(){
                return command
                .fillDrInfo(customer);
            },
            'click on edit doctor link' : function(){
                return command
                .findAndClick('.col-9 > div:nth-child(3) > p:nth-child(1) > a:nth-child(1)');
            },
            'get name of current doctor' : function(){
                return command
                .findByCssSelector('#find-different-doc')
                .execute(function(){
                    return $('div.row:nth-child(2) > div:nth-child(1) > p:nth-child(1)').text();
                })
                .then(function(dr_name){
                    prev_dr_name = dr_name.replace('Doctor Name:','').trim();
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
                .findAndClick('div.search-result-page:nth-child(1) > div:nth-child(1) > div:nth-child(4) > p:nth-child(1) > a:nth-child(1)');
            },
            'assert that new doctor name is different than previous' : function(){
                return command
                .findByCssSelector('.review-doctor-name')
                .getVisibleText()
                .then(function(new_dr_name){
                    new_dr_name = new_dr_name.replace(/Doctor:\s*/g,'').trim();
                    assert.notEqual(new_dr_name,prev_dr_name);
                });
            },
            'logout' : function(){
                return command
                .logoutFromHeader()
                .assertLoggedOut();
            }
        };
    });
});
