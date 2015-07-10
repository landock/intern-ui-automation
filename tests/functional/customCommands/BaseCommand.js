define([
  'intern/dojo/node!leadfoot/Command'
], 

function (_Command) {

var proto = BaseCommand.prototype = Object.create(_Command.prototype, {});

function BaseCommand() {
    _Command.apply(this, arguments);
}

proto.constructor = BaseCommand;
proto.setDropdown = function (id, value) {
    return new this.constructor(this, function () {
        return this.parent
            .execute(function(id, value){
                var elem = $(id);
                if(id.contains("Power")){
                    elem.parent().siblings().find('li a[data-value="'+value+'"]').click()
                }
                else{
                    elem.val(value).change()
                }
            },[id, value])
     });
};
    
return BaseCommand;

});


//$('#dwfrm_lensproduct_rightEye_contactsPower').parent().siblings().find('li a[data-value="-2.00"]').click()

//$('#dwfrm_lensproduct_rightEye_baseCurve').val('8.8').change()
