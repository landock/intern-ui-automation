define([ '../../node_modules/chance/chance' ],
       function(Chance){
           var chance = new Chance();
           var creditCardTypes = [
               {type: 'Mastercard'},
               {type: 'Visa'},
               {type: 'American Express'},
               {type: 'Discover Card'}
           ];
    
           var creditCardNumber = {
                'MasterCard': '5154044313438948',
                'Visa' : '4699461124460157',
                'AmericanExpress' : '345595026987803',
                'Discover' : '6011427987144259'
           }

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
                   first_name: 'Yissakhar',
                   last_name: 'Hampus',
                   email: 'yissakhar.hampus@gmail.com',
                   shipping_address1: '2311 Anthony Avenue',
                   shipping_address2: 'l33t',
                   shipping_city: 'Rockwood',
                   shipping_zip: '76873',
                   shipping_phone: ' (325) 785-2492',
                   shipping_state: 'TX',
                   password: 'Ecommrocks',
                   credit_card: '4111111111111111',
                   doctor: 'Test',
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
               },
               {
                   first_name: 'EmailReset',
                   last_name: 'Test',
                   email: '1800contacts_email_reset_test@mailinator.com',
                   shipping_address1: '',
                   shipping_address2: '',
                   shipping_city: '',
                   shipping_zip: '',
                   shipping_phone: '',
                   shipping_state: '',
                   password: '', //this changes everytime the resetEmail test is run
                   credit_card: '',
                   doctor: '',
                   doctor_state: ''
               }
           ];

           var gigyaLoginInfo = { email: 'yissakhar.hampus@gmail.com', password: 'Ecommrocks' };

           var randomCreditCardType = chance.pick( creditCardTypes );

           return {
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

               'getRandomExistingCustomer': function(){
                   return chance.pick( existingCustomers );
               },

               'getGigyaLogin': function(service){
                   return gigyaLoginInfo;
               }
           };
       });
