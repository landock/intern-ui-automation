define([
	'intern!object',
	'../../utility/generator',
	'../../config',
	'../customCommands/AllCommands',
    '../../utility/skipRemainingTests'
	],

	function (registerSuite, generator, config, Command, skip) {
		registerSuite(function() {
			var customer;
			var command;
            var anotherRandomCustomer;
			var initialDefault;

			return {
				name: 'new logged in customer can change default address',

				setup: function() {
					customer = generator.getRandomCustomer();
                    anotherRandomCustomer = generator.getRandomCustomer();
					command = new Command(this.remote);

					return command
                    .configureNewSession()
					.get(config.URL + '/account');
				},

                beforeEach: function() {
                    skip(this);
                },

                
                'create a new account' : function() {
                    return command
                    .createNewAccount(customer)
                    .assertLoggedIn();
                },

				'navigate to account page': function() {
               		return command.findAndClick('a[title="My Account"]');
            	},

      	         'navigate to account page address tab': function() {
                    return command.findAndClick('div.tab:nth-child(3) > a:nth-child(1)');
                },
          
                'add new address' : function() {
                    return command
                    .findAndClick('a[href*="Address-Add"]')
                    .fillAddNewAddressForm(customer);
                },

                'store initial default': function() {
                    return command
                    .findByCssSelector('p[class="no-margin-bottom saved-address"]')
                    .getVisibleText()
                    .then(function(addressText) {
                        initialDefault = addressText;
                    })
                    .end();
                },
          
                //this becomes the new default address
                'add a new address': function() {
                    return command
                    .findAndClick('a[title="Create New Address"]')
                    .fillAddNewAddressForm(anotherRandomCustomer);
                },

                // set initial default address back to default
                'set default address': function() {
                    return command
                    .findAndClick('div.col-3:nth-child(4) > div:nth-child(1) > p:nth-child(2) > a:nth-child(3)');
                },

     	 	    'assert initial default is current default': function() {
     	 		   return command
     	 		   .assertElementText('p[class="no-margin-bottom saved-address"]', initialDefault);
     	 	    },
                
                'logout' : function(){
                    return command
                    .logoutFromHeader()
                    .assertLoggedOut();
                }
			 };
		});
	});
