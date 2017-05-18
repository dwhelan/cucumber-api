'use strict';

const reporter = require('cucumber-html-reporter');

module.exports = function () {

  this.AfterFeatures(features => {
    var options = {
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
};
