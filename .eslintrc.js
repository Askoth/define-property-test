module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
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
      }
    }
  ]
}
