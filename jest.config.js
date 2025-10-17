module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    'pages/**/*.js',
    'components/**/*.js',
    '!pages/_app.js',
    '!pages/_document.js',
  ],
};
