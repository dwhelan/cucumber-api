'use strict';

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');
const reporter = require('cucumber-html-reporter');

defineSupportCode(function({registerHandler}) {
  registerHandler('AfterFeatures', features => {
    const options = {
      theme: 'bootstrap',
      jsonDir: 'reports/cucumber',
      output: 'reports/cucumber_report.html',
      reportSuiteAsScenarios: true,
      launchReport: false,
      metadata: {
        'Engine Version': process.env.npm_package_version
      }
    };
    reporter.generate(options);
  });
});
