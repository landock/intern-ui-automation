define(['../../config'],

function (config) {
    function Home(remote){
        this.remote = remote;
    }

    Home.prototype = {
        constructor: Home,
        'navigateToAcuvueOasys24': function () {
            return this.remote
                .get(config.URL + '/home/index')
                .findByCssSelector('#primary-nav div ul>li.brand')
                .moveMouseTo()
                .findByLinkText('Air Optix')
                .moveMouseTo()
                .end()
                .findAllByCssSelector('li.link.flyout')
                .findByLinkText('\nAir Optix Aqua\n')
                .click()
                .getCurrentUrl()
                .then(function(name){
                    return name;
                });
        }
    };	      
    return Home;
});
