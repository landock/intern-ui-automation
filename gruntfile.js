(function () {
    module.exports = function(grunt) {
        grunt.initConfig({
            run: {
                selenium: {
                    options: {
                        wait:false,
                        quiet: true,
                        cwd: 'lib'
                    },
                    exec:'java -jar selenium-server-standalone-2.46.0.jar'
                }

            },
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
        grunt.loadNpmTasks('grunt-run');
        grunt.loadNpmTasks('intern');
        grunt.loadNpmTasks('grunt-selenium-webdriver');

        grunt.registerTask('test', [ 'run:selenium', 'intern', 'stop:selenium' ]);
        grunt.registerTask('default', ['selenium_start', 'intern', 'selenium_stop' ]);
        grunt.registerTask('sauce', ['intern']);
    };
}());
