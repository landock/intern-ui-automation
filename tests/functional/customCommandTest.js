define([
    'intern!object',
    'intern/chai!assert',
    '../utility/generator',
    '../config',
    './elements/input',
    './customCommands/ProductCommand'
],
       
        

function (registerSuite, assert, generator, config, Input, Command) {

	registerSuite(function(){
    
		var customer;
		var input;
        var command;
 
		return {
			name: 'Sign in from Home Page',
			setup: function() {
				customer = generator.getExistingCustomer(config.existingId);
				input = new Input(this.remote);
                command = new Command(this.remote);
				return this.remote
				.clearCookies()
				.setTimeout('script', 60000)
				.setTimeout('page load', 60000)
				.setFindTimeout(50000)
				.get(config.URL + '/lens/acuvue-oasys-24');
			},

			/*'test custom command login' : function() {
				return command
				.login(customer);
			},

			'test custom command logout' : function() {
				return command
				.logout();
			}*/
            
            'test stuff' : function() {
				return command
                .fillInfo()
                
				/*.setDropdown('#dwfrm_lensproduct_rightEye_contactsPower','+1.25')
                .setDropdown('#dwfrm_lensproduct_leftEye_contactsPower','-1.25')
                .setDropdown('#dwfrm_lensproduct_rightEye_baseCurve','8.8')
                .setDropdown('#dwfrm_lensproduct_leftEye_baseCurve','8.4')
                .enterInput('#patient-first', 'Testy')
                .enterInput('#patient-last', 'Test')*/
			},
            
            
		};
	});
});