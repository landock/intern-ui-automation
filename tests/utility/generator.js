define([ '../../node_modules/chance/chance' ],
       function(Chance){
           var chance = new Chance();
           var creditCardTypes = [
               {type: 'Mastercard'},
               {type: 'Visa'},
               {type: 'American Express'},
               {type: 'Discover Card'}
           ];

           var existingCustomers = [
               {
                   first_name: 'Test',
                   last_name: 'TestAcct',
                   email: 'measley-test@test.com',
                   shipping_address1: '111 Techtock WY',
                   shipping_address2: 'l33t',
                   shipping_city: 'Silicon Valley',
                   shipping_zip: '90210',
                   shipping_phone: '(123) 456-7890',
                   shipping_state: 'CA',
                   password: '123456',
                   credit_card: '4111111111111111',
                   doctor: 'John Smith',
                   doctor_state: 'UT'
               },
               {
                   first_name: 'Test',
                   last_name: 'TestAcct',
                   email: 'seleniumtest_d6cd7f9e@1800contacts.com',
                   shipping_address1: '111 Techtock WY',
                   shipping_address2: 'l33t',
                   shipping_city: 'Silicon Valley',
                   shipping_zip: '90210',
                   shipping_phone: '(123) 456-7890',
                   shipping_state: 'CA',
                   password: 'password',
                   credit_card: '4111111111111111',
                   doctor: 'John Smith',
                   doctor_state: 'UT'
               },
               {
                   first_name: 'Test',
                   last_name: 'TestAcct',
                   email: 'seleniumtest_7ebfde31@1800contacts.com',
                   shipping_address1: '111 Techtock WY',
                   shipping_address2: 'l33t',
                   shipping_city: 'Silicon Valley',
                   shipping_zip: '90210',
                   shipping_phone: '(123) 456-7890',
                   shipping_state: 'CA',
                   password: 'password',
                   credit_card: '4111111111111111',
                   doctor: 'John Smith',
                   doctor_state: 'UT'
               },
               {
                   first_name: 'Test',
                   last_name: 'TestAcct',
                   email: 'seleniumtest_30019b7d@1800contacts.com',
                   shipping_address1: '111 Techtock WY',
                   shipping_address2: 'l33t',
                   shipping_city: 'Silicon Valley',
                   shipping_zip: '90210',
                   shipping_phone: '(123) 456-7890',
                   shipping_state: 'CA',
                   password: 'password',
                   credit_card: '4111111111111111',
                   doctor: 'John Smith',
                   doctor_state: 'UT'
               }
           ];

           var gigyaLoginInfo = { email: 'yissakhar.hampus@gmail.com', password: 'Ecommrocks' };

           var randomCreditCardType = chance.pick( creditCardTypes );

           return{
               'getRandomCustomer': function() {
                   return {
                       first_name: 'Test',
                       last_name: 'TestAcct',
                       email: 'seleniumtest_'+ chance.hash({length:8})+'@1800contacts.com',
                       shipping_address1: chance.address(),
                       shipping_address2: chance.hash({length:3}),
                       shipping_city: 'Salt Lake City',
                       shipping_zip: '84111',
                       shipping_phone: chance.phone(),
                       shipping_state: 'UT',
                       password: 'password',
                       password_confirm: 'password',
                       credit_card: chance.cc( randomCreditCardType ),
                       doctor: 'Test',
                       doctor_state: 'UT'
                   };
               },

               'getExistingCustomer': function(index){
                   return existingCustomers[index];
               },

               'getRandomExistingCustomer': function(index){
                   return chance.pick( existingCustomers );
               },

               'getGigyaLogin': function(service){
                   return gigyaLoginInfo
               }
           };
       });
