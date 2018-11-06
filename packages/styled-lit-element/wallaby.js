// eslint-disable-next-line import/no-extraneous-dependencies
const wallabyWebpack = require('wallaby-webpack');

const wallabyPostprocessor = wallabyWebpack();

module.exports = {
  files: [
    { pattern: 'src/**/*.js', load: false },
  ],
  tests: [
    { pattern: 'test/**/*.spec.js', load: false },
  ],
  testFramework: 'mocha',
  env: {
    kind: 'chrome',
  },
  postprocessor: wallabyPostprocessor,
  setup: () => {
    window.__moduleBundler.loadTests();
  },
};
