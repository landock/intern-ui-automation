define(function (require) {
	
	function Input(remote){
		this.remote = remote;
	}
	
	Input.prototype = {
			constructor: Input,
			'enterInput': function(id, text){
                return this.remote
                    .execute(function(id2, txt, selector){$(id2).removeClass(selector).val(txt);}, [id, text, 'placeholder'])
                    .findByCssSelector(id)
                    .getProperty('value')
                    .then(function(text){
                        return text;
                    });
			}
	};
	return Input;
});