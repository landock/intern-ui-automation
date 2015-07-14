define([
    './BaseCommand'
],

function(BaseCommand){
    var proto = HeaderCommand.prototype = Object.create(BaseCommand.prototype, {});
    
    function HeaderCommand() {
	   BaseCommand.apply(this, arguments);
    }
    
    proto.constructor = HeaderCommand;
    
     proto.goToAccount = function () {
        return new this.constructor(this, function () {
            return this.parent
            .get(config.URL + '/home/index')
            .findByCssSelector('a[title="My Account"]')
			.click()
			.end()
			.findByClassName('account-tabs')
         });
    };
    
   
    return HeaderCommand;
});