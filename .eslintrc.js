module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [
    {
      files: ['*'],
      rules: {
        'spaced-comment': 'off',
        semi: 'off',
        'no-multiple-empty-lines': 'off',
        'space-before-function-paren': 'off',
        'multiline-ternary': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {},
  settings: {
    react: {
      version: 'detect'
    }
  }
};
