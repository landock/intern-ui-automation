(function () {
    module.exports = function(grunt) {

        grunt.initConfig({
            intern:{
            	someReleaseTarget: {
            		options: {
            			runType: 'runner',
            			config: 'tests/intern.js',
            			reporters: ['console', 'pretty']
            		}
            	}
            }
        });
        
        grunt.loadNpmTasks('intern');

        grunt.registerTask('test', [ 'intern' ]);
    };
}());
