define([
    'intern!object',
    'intern/chai!assert',
    '../utility/generator',
    '../config',
    './elements/input',
    './customCommands/BaseCommand'
],
       
        

function (registerSuite, assert, generator, config, Input, BaseCommand) {

	registerSuite(function(){
    
		var customer;
		var input;
        var command;
 
		return {
			name: 'Sign in from Home Page',
			setup: function() {
				customer = generator.getExistingCustomer(config.existingId);
				input = new Input(this.remote);
                command = new BaseCommand(this.remote);
				return this.remote
				.clearCookies()
				.setTimeout('script', 60000)
				.setTimeout('page load', 60000)
				.setFindTimeout(50000)
				.get(config.URL);
			},

			'test custom command login' : function() {
				return command
				.login(customer);
			},

			'test custom command logout' : function() {
				return command
				.logout();
			}
		};
	});
});