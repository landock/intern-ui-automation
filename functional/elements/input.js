define(function (require) {
	
	function Input(remote){
		this.remote = remote;
	}
	
	Input.prototype = {
			constructor: Input,
			'enterInput': function(id, text){
				return this.remote
				.findByCssSelector('#'+id)
					.click()
					.clearValue()
					.type(text)
					.getProperty('value')
					.then(function(val){
						return val;
					});
			}
	};	      
	return Input;
});