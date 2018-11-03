module.exports = {
  files: [
    'src/**/*.js',
  ],
  tests: [
    'test/**/*.spec.js',
  ],
  testFramework: 'mocha',
  env: {
    type: 'node',
    params: {
      runner: `-r ${require.resolve('esm')}`,
    },
  },
};
