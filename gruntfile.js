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

        grunt.loadNpmTasks('intern');

        grunt.registerTask('test', [ 'intern' ]);
        grunt.registerTask('default', [ 'intern' ]);
    };
}());
