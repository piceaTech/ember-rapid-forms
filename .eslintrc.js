module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    "ember/use-ember-get-and-set": 0,
    "ember/no-observers": 0,
    "ember/closure-actions": 0
  }
};
