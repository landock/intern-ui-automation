(function () {
    module.exports = function(grunt) {
        function logToText(err, stdout,stderr, cb) {
            //var seleniumLogStream = fs.createWriteStream('seleniumLog.log');
            //stdout.pipe(seleniumLogStream);
            cb();
        }
        grunt.initConfig({
            run: {
                selenium: {
                    exec:'java -jar selenium-server-standalone-2.46.0.jar -log selenium.log',
                    options: {
                        wait:false,
                        cwd: 'lib'
                    }
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
                },
                mobile: {
                    options: {
                        runType: 'runner',
                        config: 'tests/mobile.js',
                        reporters: ['Console']
                        // reporters: ['Pretty']
                    }
                }
            }
        });
        grunt.loadNpmTasks('grunt-shell');
        grunt.loadNpmTasks('grunt-run');
        grunt.loadNpmTasks('intern');
        grunt.loadNpmTasks('grunt-selenium-webdriver');

        grunt.registerTask('test', [ 'run:selenium', 'intern', 'stop:selenium' ]);
        grunt.registerTask('mobile', [ 'run:selenium', 'intern:mobile', 'stop:selenium' ]);
        grunt.registerTask('selenium', [ 'shell:selenium']);
        grunt.registerTask('default', ['selenium_start', 'intern:someReleaseTarget', 'selenium_stop' ]);
        grunt.registerTask('sauce', ['intern']);
    };
}());
