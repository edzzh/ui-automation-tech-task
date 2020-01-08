const { removeSync } = require('fs-extra');
const defaultTimeoutInterval = process.env.DEBUG ? (60 * 60 * 500) : 60000;
const uuid = require("uuid/v4");

exports.config = {
    runner: 'local',

    // host: 'localhost',
    port: 4444,
    path: '/wd/hub',

    specs: [
        './features/*.feature',
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,

    capabilities: [
      { browserName: 'chrome', maxInstances: 2 }
      ],

    // chromeDriverArgs: ['--port=9515', '--url-base=\'/\''], // default for ChromeDriver
    // chromeDriverLogs: './',
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,
    logLevel: 'silent',     // Level of logging verbosity: silent | verbose | command | data | result | error
    coloredLogs: true,      // Enables colors for log output.
    screenshotPath: './reports/errorShots/',   // Saves a screenshot to a given path if a command fails.
    
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", then the base url gets prepended.
    baseUrl: '/',
    waitforTimeout: 60000,            // Default timeout for all waitFor* commands.
    connectionRetryTimeout: 90000,    // Default timeout in milliseconds for request  if Selenium Grid doesn't send response
    connectionRetryCount: 3,          // Default request retries count

    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    //
    reporters: [
      'spec',
      ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
        useCucumberStepReporter: true
      }]
    ],

    services: ['selenium-standalone'],

    framework: 'cucumber',

    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        requireModule: ['@babel/register'],
        require: ['./step_definitions/*.js', './support/*.js'],   // <string[]> (file/dir) require files before executing features
        backtrace: true,    // <boolean> show full backtrace for errors
        compiler: [], // <string[]> filetype:compiler used for processing required features
        failAmbiguousDefinitions: true,       // <boolean< Treat ambiguous definitions as errors
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: false,    // <boolean> abort the run on first failure
        ignoreUndefinedDefinitions: false,    // <boolean> Enable this config to treat undefined definitions as warnings
        name: [],           // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        snippets: true,     // <boolean> hide step definition snippets for pending steps
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        source: false,      // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: true,       // <boolean> fail if there are any undefined or pending steps
        tagExpression: 'not @Pending',      // <string> (expression) only execute the features or scenarios with tags matching the expression, see https://docs.cucumber.io/tag-expressions/
        timeout: defaultTimeoutInterval,    // <number> timeout for step definitions
        tagsInTitle: false,                 // <boolean> add cucumber tags to feature or scenario name
        snippetSyntax: undefined,           // <string> specify a custom snippet syntax
    },

    //
    // =====
    // Hooks
    // =====
    // WedriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    // Gets executed before test execution begins. At this point you can access all global
    // variables, such as `browser`. It is the perfect place to define custom commands.
    onPrepare: function() {
      removeSync('./allure-results');
    },
    
    before: function() {
      /**
       * Setup the Chai assertion framework
       */
      const chai    = require('chai');
      global.expect = chai.expect;
      global.assert = chai.assert;
      global.should = chai.should();

      // Global Test Data
      global.firstName = "TDL_TEST_NAME_1980";
      global.lastName = "TDL_TEST_LASTNAME_1999";
      global.mobile = "37188886666";
      global.email = "tdl_test_email_000@gmail.com";
      global.password = "Password1234";
      global.hotelPrice = null;

      // Mock Data For Account Creation
      global.mockFirstName = `name-${uuid().substring(0,8)}`;
      global.mockLastName = `lastname-${uuid().substring(0,8)}`;
      global.mockEmail = `email-${uuid().substring(0,8)}@gmail.com`;
      global.mockMobile = Math.floor(Math.random() * 1000000000);
    },
    //
    // after: function (capabilities, specs) {
    //   //do your stuff
    // },
    //
    // beforeStep: function (stepResult) {
    //     //do your stuff
    // },
    //
    // afterStep: function (stepResult) {
    //     //do your stuff
    // },
    //
    //
    // beforeFeature: function (feature) {
    //     //do your stuff
    // },
    //
    // afterFeature: function (feature) {
    //     //do your stuff
    // },
    //
    // beforeScenario: function (scenario) {
    //     //do your stuff
    // },
    // afterScenario: function (scenarioResult) {
    //     //do your stuff
    // },
    afterTest: function(test) {
      if (test.error !== undefined) {
        browser.takeScreenshot();
      }
    },
    
    onComplete: function() {
        // generate({
        //     jsonDir: './reports/cucumber-json/',
        //     reportPath: './reports/html'
        // })
    }
};
