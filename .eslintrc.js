module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true
  },
  extends: 'eslint:recommended',
  globals: {
    Promise: true,
    Set: true
  },
  rules: {
    'no-extra-semi': 'off'
  },
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'no-unused-expressions': 'off'
      },
      globals: {
        describe: true,
        test: true,
        expect: true,
        jest: true,
      }
    }
  ]
}
