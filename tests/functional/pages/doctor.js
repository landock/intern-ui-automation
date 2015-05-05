define([
        '../elements/input',
        '../elements/customDropdown'
    ],
    function (Input, Dropdown) {

    var Input;
    var Dropdown;

    function Doctor(remote){
        this.remote = remote;
        Input = new Input(this.remote);
        Dropdown = new Dropdown(this.remote);
    }

    Doctor.prototype = {
        constructor: Doctor,
        'enterDoctor': function (name) {
            return Input
                .enterInput('#dwfrm_doctor_doctorName', name);
        },
        'enterCity': function(){
            // optionally needs implemented
        },
        'selectState': function(stateAbbr){
            return Dropdown
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
                .end();
        },
        'clickFirstDocResult': function(){
            return this.remote
                .sleep(6000)
                .findByCssSelector('.col.span-2.last > p > a')
                .click()
                .end();

        }
    };
    return Doctor;
});