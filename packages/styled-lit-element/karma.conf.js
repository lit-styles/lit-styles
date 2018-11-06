const path = require('path');

module.exports = (config) => {
  config.set({
    browsers: [
      'ChromeHeadless',
      'FirefoxHeadless',
    ],
    frameworks: ['mocha'],
    reporters: ['mocha', 'coverage-istanbul'],
    files: [
      'test/**/*.js',
    ],
    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap'],
    },
    logLevel: config.LOG_ERROR,
    colors: true,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            include: path.resolve('./src/'),
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true },
            },
            enforce: 'post',
          },
        ],
      },
    },
    webpackMiddleware: {
      stats: 'errors-only',
    },
    coverageIstanbulReporter: {
      reports: ['text'],
      combineBrowserReports: true,
      skipFilesWithNoCoverage: true,
    },
  });
};
