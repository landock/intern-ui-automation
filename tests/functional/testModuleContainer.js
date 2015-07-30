define([
    'intern!object',
    './testModule'
],

function (registerSuite, testModule) {
	registerSuite(function(){
		return {
			name: 'test of modules',
            'test the module': testModule
		};
	});
});
