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
                        doctor: 'John Smith',
                        doctor_state: 'UT'
                    }
        }
        ,
        'getExistingCustomer': function(index){
            var personList = [
                {
                    firstName: 'Test',
                    lastName: 'TestAcct',
                    email: 'seleniumtest_awe12345@1800contacts.com',
                    shipping_address1: '111 Techtock WY',
                    shipping_address2: 'l33t',
                    shipping_city: 'Silicon Valley',
                    shipping_zip: '12345',
                    shipping_phone: '(123) 456-7890',
                    shipping_state: 'CA',
                    password: 'password',
                    password_confirm: 'password',
                    creditCard: '4111111111111111',
                    doctor: 'John Smith',
                    doctor_state: 'CO'
                }
            ];
            return personList[index];
        }
    }
});
