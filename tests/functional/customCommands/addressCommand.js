define([
	'./BaseCommand'
]
function (BaseCommand) {

var proto addressCommand.prototype = Object.create(BaseCommand.prototype, {});

function AddressCommand() {
	BaseCommand.apply(this.arguments);
}

proto.constructor = AddressCommand;



return AddressCommand;
});


