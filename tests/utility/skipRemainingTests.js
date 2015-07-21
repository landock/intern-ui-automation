/**
 * Skips failed tests if  you use it in the afterEach method of the suite.
 */

define(function() {
    return function(suite) {
        var skipRemainingTests = false;
        suite.tests.forEach(function(test, index, arr) {
            if(skipRemainingTests) {
                test.skipped = 'one fails all fail';
                return;
            }
            if(test.error){
                skipRemainingTests = true;
            }
        });
    };
});
