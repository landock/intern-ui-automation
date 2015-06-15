define([
        '../../config',
        'intern/dojo/node!leadfoot/helpers/pollUntil',
        '../../utility/functionalTestUtils'],

    function (config, pollUntil, utils) {
        function AccountHub(remote){
            this.remote = remote;
        }

        AccountHub.prototype = {
            constructor: AccountHub,
            'checkRecentOrderChkBox': function(){
                return this.remote
                    .findByCssSelector('.recent-pres-header label')
                    .click();
            },
            'clickReorderThisRx': function(){
                return this.remote
                    .findByCssSelector('#btn-reorder-rx')
                    .click()
                    .then(pollUntil(utils.elementVisibleByClass, ['cart-wrapper'], 60000, 500))
                    .then(function(ele){
                        return true;
                    }, function(error){
                        return false;
                    });
            }
        };
        return AccountHub;
    });
