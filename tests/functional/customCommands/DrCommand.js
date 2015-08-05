define([
    './BaseCommand'
],

function(BaseCommand){
    var proto = DrCommand.prototype = Object.create(BaseCommand.prototype, {});
    
    function DrCommand() {
	   BaseCommand.apply(this, arguments);
    }
    
    proto.constructor = DrCommand;
    
    proto.fillDrInfo = function (customer) {
        return new this.constructor(this, function () {
            return this.parent
            .enterInput('#dwfrm_doctor_doctorName', customer.doctor)
            .setDropdown('#dwfrm_doctor_states_stateUS', customer.doctor_state)
            .findAndClick('a.btn:nth-child(4)')
            .sleep(1000) //Todo: use polluntil or something here
            .findAndClick('div.search-result-page:nth-child(1) > div:nth-child(1) > div:nth-child(4) > p:nth-child(1) > a:nth-child(1)');
         });
    };

    proto.mobileFillDrInfo = function (customer) {
        return new this.constructor(this, function () {
            return this.parent
            .enterInput('#dwfrm_doctor_doctorName', customer.doctor)
            .setDropdown('#dwfrm_doctor_states_stateUS', customer.doctor_state)
            .findAndClick('a.btn:nth-child(4)')
            .sleep(1000) //Todo: use polluntil or something here
            .findAndClick('#doc-results > div.search-result-page.active.visited > a:nth-child(1) > div.col.span-2.last');
         });
    };

    return DrCommand;
});
