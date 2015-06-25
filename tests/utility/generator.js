define([ '../../node_modules/chance/chance' ],
    function(Chance){
    var chance = new Chance();
    var creditCardTypes = [
        {type: 'Mastercard'},
        {type: 'Visa'},
        {type: 'American Express'},
        {type: 'Discover Card'}
    ];
    var randomCreditCardType = chance.pick( creditCardTypes );

    return{
        'getRandomCustomer': function() {
                    return {
                        firstName: 'Test',
                        lastName: 'TestAcct',
                        email: 'seleniumtest_'+ chance.hash({length:8})+'@1800contacts.com',
                        shipping_address1: chance.address(),
                        shipping_address2: chance.hash({length:3}),
                        shipping_city: 'Salt Lake City',
                        shipping_zip: '84111',
                        shipping_phone: chance.phone(),
                        shipping_state: 'UT',
                        password: 'password',
                        password_confirm: 'password',
                        creditCard: chance.cc( randomCreditCardType ),
                        doctor: 'Test',
                        doctor_state: 'UT'
                    };
        },
        'getExistingCustomer': function(index){
            var personList = [
                {
                    firstName: 'Test',
                    lastName: 'TestAcct',
                    email: 'measley-test@test.com',
                    shipping_address1: '111 Techtock WY',
                    shipping_address2: 'l33t',
                    shipping_city: 'Silicon Valley',
                    shipping_zip: '90210',
                    shipping_phone: '(123) 456-7890',
                    shipping_state: 'CA',
                    password: '123456',
                    creditCard: '4111111111111111',
                    doctor: 'John Smith',
                    doctor_state: 'UT'
                }
            ];
            return personList[index];
        }
    };
});