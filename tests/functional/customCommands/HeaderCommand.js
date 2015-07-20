define([
    './BaseCommand'
],

function(BaseCommand){
    var proto = HeaderCommand.prototype = Object.create(BaseCommand.prototype, {});
    
    function HeaderCommand() {
	   BaseCommand.apply(this, arguments);
    }
    
    proto.constructor = HeaderCommand;
    
    return HeaderCommand;
});