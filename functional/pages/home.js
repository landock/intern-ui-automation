define(['../../config'],
		function (config) {
	
	function Home(remote){
		this.remote = remote;
	}
	
	Home.prototype = {
			constructor: Home,
			'navigateToAcuvueOasys24': function () {
	        	return this.remote
	        	 .get(config.URL + '/home/index')
	        	 .setFindTimeout(10000)
	        	 .findByCssSelector('#primary-nav div ul>li.brand')
	        	     .moveMouseTo()
	        	 .findByLinkText('Acuvue')
	        	     .moveMouseTo()
	        	 .findByXpath('//*[@id="primary-nav"]/div/ul/li[1]/ul/li[2]/ul/li[1]/a')
	        	     .click()
	        	     .getCurrentUrl()
	        	     .then(function(name){
	        	    	 return name;
	        	     });
			}
	};	      
	return Home;
});