(function () {
    module.exports = function(grunt) {
        grunt.initConfig({
            run: {
                selenium: {
                    exec:'java -jar selenium-server-standalone-2.46.0.jar -log selenium.log',
                    options: {
                        wait:false,
                        cwd: 'lib'
                    }
                },
                selenium_stop: {
                    exec: 'curl http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer'
                }
            },

            intern:{
                dev: {
                    options: {
                        runType: 'runner',
                        config: 'tests/intern.js',
                        reporters: ['Runner']
                    }
                },
                mobile: {
                    options: {
                        runType: 'runner',
                        config: 'tests/mobile.js',
                        reporters: ['Runner']
                    }
                }
            }
        });
        grunt.loadNpmTasks('grunt-run');
        grunt.loadNpmTasks('intern');

        grunt.registerTask('default', [ 'run:selenium', 'intern:dev', 'run:selenium_stop' ]);
        grunt.registerTask('mobile', [ 'run:selenium', 'intern:mobile', 'run:selenium_stop' ]);
        grunt.registerTask('sauce', [ 'intern:dev', 'intern:mobile' ]);
    };
}());
