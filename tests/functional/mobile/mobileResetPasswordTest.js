define([
	'intern!object',
	'../../config',
	'../../utility/generator',
	'intern/chai!assert',
	'intern/dojo/node!leadfoot/helpers/pollUntil',
	'../customCommands/AllCommands',
	'../../utility/skipRemainingTests'
	],

	function (registerSuite, config, generator, assert, pollUntil, Command, skip) {
		registerSuite(function() {
			var customer;
			var command;
			var newPassword = 'newPassword';

			return {
				name: 'mobile new customer can reset password',

				setup: function() {
					command = new Command(this.remote);
	                customer = generator.getRandomMailinatorCustomer();
	                return command
	                .configureNewMobileSession(60000)
	                .get(config.URL + '/account');
				},

				beforeEach : function() {
					skip(this);
				},

				'create new account' : function() {
					return command
					.createNewAccount(customer)
					.assertLoggedIn();
				},

				'enter and submit reset request' : function() {
	                return command
	                .get(config.URL + '/forgot-password')
	                .enterInput('#dwfrm_requestpassword_email', customer.email)
	                .findAndClick('button[name="dwfrm_requestpassword_send"]');
            	},

            	'go to mailinator inbox' : function(){
	                return command
	                .get('http://mailinator.com/inbox.jsp?to=' + customer.email.replace('@mailinator.com', ''));
            	},

	            'open reset email on arrival' : function(){
	                return command
	                .then(pollUntil( function(){
	                    var contains_less = 
	                        $('li.row-fluid:nth-child(1) > a:nth-child(1) > div:nth-child(3)').text().indexOf('less');
	                    return contains_less != -1 ? true : null;
	                },[],60000,1000))
	                .execute(function(){
	                    return $('#mailcontainer > li:nth-child(1) > a').attr('onclick');
	                })
	                .then(function(attr){
	                    var msg_id = attr.match(/showmail\('(.*)'\)/)[1];
	                    return command
	                    .get('https://mailinator.com/rendermail.jsp?msgid='+ msg_id);
	                });
	            },

	            'click on password reset link in email' : function(){
	                return command
	                .execute(function(){
	                    return $('#wrapper > table > tbody > tr:nth-child(2) > td > font > center > table > tbody > tr > td > font > p:nth-child(2) > font > a').attr('href');
	                })
	                .then(function(link){
	                    return command
	                    .get(link);
	                });
	            },

	            'enter new password and submit' : function(){
	                return command
	                .sleep(5000)
	                .getCurrentUrl()
	                .enterInput('#dwfrm_resetpassword_password',newPassword)
	                .enterInput('#dwfrm_resetpassword_passwordconfirm',newPassword)
	                .findAndClick('button[name="dwfrm_resetpassword_send"]');
	            },

	            'logout' : function(){
	                return command
	                .mobileLogout()
	                .assertLoggedOut();
	            },

	            'assert that new password works' : function(){
	                return command
	                .mobileLogin({'email':customer.email,'password':newPassword})
	                .assertLoggedIn();
	            }
			};
		});
	});