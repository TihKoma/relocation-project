module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    es2020: true,
    node: true,
    mocha: true
  },
  rules: {
    'object-curly-spacing': ['error', 'never'],
    'newline-before-return': 2,
    semi: ['error', 'never'],
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    'no-case-declarations': 0,
    'no-useless-catch': 0,
    'generator-star-spacing': 0
  }
}
