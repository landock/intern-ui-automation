define([
	'intern!object',
	'../utility/generator',
	'../config',
	'./customCommands/BaseCommand'
],

function (registerSuite, generator, config, BaseCommand) 
{
	registerSuite (function()
	{
		var customer;
		var baseCommand;

		return 
		{
			name: 'Sign In',

			setup : function() 
			{
				customer = generator.getExistingCustomer(config.existingId);
				baseCommand = new BaseCommand(this.remote);

				return this.remote
				.clearCookies()
				.setTimeout('script', 60000)
				.setTimeout('page load' 60000)
				.setFindTimeout(50000)
				.get(config.URL);
			},

			'login from main button': function() 
			{
				return baseCommand.login(customer);
			},

			'logout': function()
			{
				return baseCommand.navLogout();
			},

			'login from navigation bar': function()
			{
				return baseCommand.navLogin(customer);
			},

			'logout': function()
			{
				return baseCommand.navLogout();
			},

			'login from cart in navigation bar': function()
			{
				return baseCommand.navLoginCart(customer);
			},

			'logout': function()
			{
				return baseCommand.navLogout();
			}
		};
	});
});