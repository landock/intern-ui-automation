define([
  'intern/dojo/node!lodash',
  'intern/dojo/node!leadfoot/Command',
  './BaseCommand',
  './AddressCommand',
  './HeaderCommand',
  './HomeCommand',
  './ProductCommand',
], 

function (_, _Command, Base, Address, Header, Home, Product) {
    var proto = AllCommands.prototype = Object.create(_Command.prototype, {});
    _.assign(proto, _Command.prototype, Base.prototype, Address.prototype, Header.prototype, Home.prototype, Product.prototype);


    function AllCommands() {
        _Command.apply(this, arguments);
    }

    proto.constructor = AllCommands;

    return AllCommands;
});