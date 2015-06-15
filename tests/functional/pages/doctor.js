define([
        '../elements/input',
        'intern/dojo/node!leadfoot/helpers/pollUntil',
        '../../utility/functionalTestUtils',
        '../elements/customDropdown'
    ],
    function (Input, pollUntil, utils, Dropdown) {

    var input;
    var dropdown;

    function Doctor(remote){
        var that = this;
        this.remote = remote;
        input = new Input(this.remote);
        dropdown = new Dropdown(this.remote);
                console.dir(that);
    }

    Doctor.prototype = {
        constructor: Doctor,
        'enterDoctor': function (name) {
            return input
                .enterNonPlaceholderInput('#dwfrm_doctor_doctorName', name)
                .then(function(val){
                    return val;
                });
                //.enterNonPlaceholderInput('#dwfrm_doctor_doctorName', name);
        },
        'enterCity': function(){
            // optionally needs implemented
        },
        'selectState': function(stateAbbr){
            return dropdown
                .selectByHTMLValue('dwfrm_doctor_states_stateUS', '//*[@id="search-by-name"]/div/div[3]/div/div/div', stateAbbr)
                .findByXpath('//*[@id="search-by-name"]/div/div[3]/div/div/div')
                .getAttribute('data-select-value')
                .then(function(selectValue){
                    return selectValue;
                });
        },
        'continueToReview': function(){
            return this.remote
                .findByXpath('//*[@id="search-by-name"]/div/a')
                .click()
                .then(pollUntil(utils.elementVisibleByClass, ['search-doctor-results'], 10000, 700))
                .then(function (val) {
                    return val.click();
                }, function (err) {
                    return;
                });

        },
        'clickFirstDocResult': function(){
            return this.remote
                .findByCssSelector('.col.span-2.last > p > a')
                .click();
            
        }
    };
    return Doctor;
});
