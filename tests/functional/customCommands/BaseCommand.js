define([
  'intern/dojo/node!leadfoot/Command'
], 

function (_Command) {

var proto = BaseCommand.prototype = Object.create(_Command.prototype, {});

function BaseCommand() {
    _Command.apply(this, arguments);
}


proto.constructor = BaseCommand;
proto.clickSignIn = function () {
    return new this.constructor(this, function () {
        return this.parent
            .findByCssSelector('a[data-inline-id="inline-sign-in"]')
            .click();
     });
};
    
return BaseCommand;

});
