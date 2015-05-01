# Front-End UI Automation using Intern

## To setup locally
1. Make sure to use Node v0.10.x.
2. Install dependencies


      npm install
      
    
3. Download selenium-standalone-2.43.1.jar
4. Download selenium-standalone-2.45.0.jar

### Setup Chrome locally
1. Download ChromeDriver
4. (optional) export selenium-standalone & ChromeDriver to your PATH.
5. Otherwise, use an explicit command.

### Setup Firefox locally
ZERO configuration required, other than specifying in the intern.js configuration file the correct environment 


{ browser: 'firefox' }


### Setup Safari locally
In order to run Safari tests locally, please make sure you have the extension downloaded.


      https://github.com/SeleniumHQ/selenium/wiki/SafariDriver
      
      
Then, in the intern.js configuration file, set the environments to only { browser: 'safari' } without a specified version.

## To setup on SauceLabs
Little configuration is needed. Inside the intern.js configuration file, make sure the 
1. tunnel is set to 'SauceLabsTunnel'.
2. environments you want to test are correctly configured.
3. In tunnelOptions, specify your username and access key.

# Run the tests


      grunt test
      
      
Done!


## Notes
For Mac users, I suggest installing NVM (node version manager) because it will let you switch between the latest versions of Node and 0.10.x with just a command.


For Window users, NVM isn't supported but you can make it run by following this tutorial: 


    https://github.com/coreybutler/nvm-windows