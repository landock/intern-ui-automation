(function () {
    module.exports = function(grunt) {

        grunt.initConfig({
            intern:{
            	someReleaseTarget: {
            		options: {
            			runType: 'runner',
            			config: 'tests/intern.js',
            			reporters: ['Console']
            			// reporters: ['Pretty']
            		}
            	}
            }
        });
        grunt.loadNpmTasks('grunt-selenium-webdriver');
        grunt.loadNpmTasks('intern');

        grunt.registerTask('test', [ 'intern' ]);
        grunt.registerTask('default', ['selenium_start', 'intern', 'selenium_stop' ]);
    };
}());
