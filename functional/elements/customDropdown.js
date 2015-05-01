define(function (require) {
	
	function customDropdown(remote){
		this.remote = remote;
	}
	
	customDropdown.prototype = { 
			constructor: customDropdown,
			'selectByHTMLValue': function(id, xpath, text){
				return this.remote
        	 	.setFindTimeout(3000)
        	 	.findByXpath(xpath)
        	 		.click()
        	 		.end()
        	 	.findByCssSelector('#'+id + ' option[value="'+text+'"]')
					.click()
					.end()
				.findByXpath(xpath)
					.getAttribute('data-select-value')
					.then(function(val){
						return val;
					});
			}
	};	      
	return customDropdown;
});