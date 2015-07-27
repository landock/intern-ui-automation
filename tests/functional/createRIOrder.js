define('Create RI Order',
       [
           'intern!object',
           'intern/chai!expect',
           '../utility/generator',
           '../config',
           './customCommands/AllCommands'
       ],
       function (registerSuite, assert,  generator, config, Command) {
           registerSuite(function(){
               var customer;
               var command;
               var userNeedsToFillOutDoctorInfo;
               return {
                   name: 'Create RI Order',
                   setup: function(){
                       command = new Command(this.remote);
                       customer = generator.getRandomExistingCustomer();
                       return command.configureNewSession()
                       .get(config.URL)
                       .loginFromHeader(customer)
                       .waitForDeletedByCssSelector('section.hero')
                       .then(function() {
                           command.get(config.URL + '/lens/acuvue-oasys-24');
                       });
                   },
                   'set lens info and continue to dr page': function() {
                       return command
                       .fillInfo()
                       .findAndClick('.btn-orange');


                   },
                   'Doctor page': {
                       setup: function() {
                           command.execute(function() {
                               return $('#search-doctor-results-primary a').filter(':visible').length;
                           })
                           .then(function(isVisible) {
                               userNeedsToFillOutDoctorInfo = isVisible !== '0' ? false : true;
                           });
                       },

                       'Fill out info': function(){
                           if(userNeedsToFillOutDoctorInfo) {
                               return command
                               .setDropdown('#dwfrm_doctor_states_stateUS', customer.doctor_state)
                               .enterInput('#dwfrm_doctor_doctorName', customer.doctor)
                               .findAndClick('a[href="ajax-doctor-results.html"]')
                               .sleep(500)
                               .findAndClick('.last a');
                           } else {
                               return command.findAndClick('#search-doctor-results-primary a');
                           }
                       }
                   },
                   // CHECK command THE PLACE ORDER IS FUNCTIONING AND NOT TIMING OUT
                   'place order': function(){
                       return command
                       .findAndClick('.btn-trigger-order');
                   },
                   'Did the order go through': function() {
                       return command
                       .setFindTimeout(8000)
                       .waitForDeletedByCssSelector('#dwfrm_billing_paymentMethods_creditCard_owner')
                       .assertElementText('h2.thankyou-msg', 'Thank you for your order');
                   }
               };
           });
       });
