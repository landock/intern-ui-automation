define([
        '../../node_modules/chance/chance'
    ],
    function(Chance){
    var chance = new Chance();

    return{
        'getRandomCustomer': function() {
                    return {
                        firstName: 'Test',
                        lastName: 'TestAcct',
                        email: 'seleniumtest_'+ chance.hash({length:8})+'@1800contacts.com',
                        shipping_address1: chance.address(),
                        shipping_address2: chance.hash({length:3}),
                        shipping_city: chance.city(),
                        shipping_zip: chance.zip(),
                        shipping_phone: chance.phone(),
                        shipping_state: chance.state({armed_forces:true, territories: true}),
                        password: 'password',
                        password_confirm: 'password',
                        creditCard: chance.cc(),
                        doctor: chance.name(),
                        doctor_state: chance.state()
                    }
        }
        //,
        //'getExistingCustomer': function(id){
        //
        //}
    }
});
