module.exports = {
  extends: ['react-app', 'plugin:@next/next/recommended'],
  plugins: ['simple-import-sort'],
  rules: {
    'no-console': ['error', { allow: ['error'] }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
      },
    ],
    'prefer-const': 'error',
    'react/jsx-curly-brace-presence': [1, { props: 'always' }],
    'react-hooks/exhaustive-deps': 'error',
    '@next/next/no-img-element': 'off',
    '@next/next/no-page-custom-font': 'off',
    'no-warning-comments': [
      'error',
      { terms: ['FIXME'], location: 'anywhere' },
    ],
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react$', '^react-dom$', '^next*', '^[^.]'],
          ['^@/*'],
          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
  },
}
