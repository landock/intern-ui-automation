define([
  'intern/dojo/node!leadfoot/Command'
], 

function (_Command) {

var proto = BaseCommand.prototype = Object.create(_Command.prototype, {});

function BaseCommand() {
    _Command.apply(this, arguments);
}

proto.constructor = BaseCommand;

proto.login = function (customer) {
    return new this.constructor(this, function () {
        return this.parent
            .findByCssSelector('a[data-flyout-id="flyout-sign-in"]')
            .click()
            .end()
			.findByCssSelector('#email-address-modal')
			.type(customer.email)
			.end()
			.findByCssSelector('#loginPassword')
            .type(customer.password)
            .end()
            .findByCssSelector('#dwfrm_login_login')
            .click()
            .end()
            .findById('logged-in-state');
    });
};

proto.logout = function() {
	return new this.constructor(this, function() {
		return this.parent
		.findByCssSelector('a[title="Logout"]')
		.click()
		.end()
		.findById('logged-out-state');
	});
};

 proto.enterInput = function() {
 	return new this.constructor(this, function(id, text) {
 		return this.parent
        .execute(function(id2, txt, selector){
            $(id2).removeClass(selector).val(txt).trigger('change');
        }, [id, text, 'placeholder'])
        .end();
 	});
 };
        
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