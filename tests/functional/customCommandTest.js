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
				.setTimeout('script', 60000)
				.setTimeout('page load', 60000)
				.setFindTimeout(50000)
				.get(config.URL + '/lens/acuvue-oasys-24');
			},

			'open custom menu' : function() {
				return command
				.setDropdown('#dwfrm_lensproduct_rightEye_contactsPower', '-2.00')
                .setDropdown('#dwfrm_lensproduct_leftEye_contactsPower', '-2.00')
                .setDropdown('#dwfrm_lensproduct_leftEye_baseCurve', '8.8')
                .setDropdown('#dwfrm_lensproduct_leftEye_baseCurve', '8.4')
			}

			
		};
	});
});