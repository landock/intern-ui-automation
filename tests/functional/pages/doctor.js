define([
        '../elements/input',
        '../elements/customDropdown'
    ],
    function (Input, Dropdown) {

    var input;
    var dropdown;

    function Doctor(remote){
        this.remote = remote;
        input = new Input(this.remote);
        dropdown = new Dropdown(this.remote);
    }

    Doctor.prototype = {
        constructor: Doctor,
        'enterDoctor': function (name) {
            return input
                .enterInput('#dwfrm_doctor_doctorName', name);
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
                .end();
        },
        'clickFirstDocResult': function(){
            return this.remote
                .setFindTimeout(25000)
                .findByCssSelector('.col.span-2.last > p > a')
                .click()
                .end();

        }
    };
    return Doctor;
});