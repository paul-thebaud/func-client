module.exports = {
  root: true,
  env: {
    es2021: true,
    browser: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // See https://stackoverflow.com/a/63767419
    'no-unused-vars': ['off'],
    // See https://youtrack.jetbrains.com/issue/WEB-21182
    'import/order': ['off'],
    // See https://github.com/typescript-eslint/typescript-eslint/issues/1103
    'class-methods-use-this': ['off'],
    'object-curly-newline': ['off'],
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never' },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
