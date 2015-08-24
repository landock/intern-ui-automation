define([ 'intern' ], function (intern) {

    var cmdArgs = intern.args;
    var increment = parseInt(cmdArgs.increment);
    var portNum = 60000;
    var proxyPortNum = 10000;

    return {
        
        proxyPort: proxyPortNum + increment,
        proxyUrl: 'http://localhost:9000/',
        defaultTimeout: 1200000,
        capabilities: {
            
        },

        environments: [ 
            { browserName: 'android', version: '4.3', deviceName:'Samsung Galaxy S4 Emulator', platform: 'Linux' },
            { browserName: 'iphone', version: '8.2', deviceName:'iPhone Simulator', platform: 'OS X 10.10' }
        ],

        maxConcurrency: Infinity,

        tunnel: 'SauceLabsTunnel',

        tunnelOptions:{
            username: 'awan',
            accessKey: '8a05a809-6b01-4bc6-80f0-83d934a78ea9',
            port: portNum + increment
        },

        suites: null,
        
        functionalSuites: [
            // added dynamically
        ],

        excludeInstrumentation: /^(?:tests|node_modules)\//
    }
});
