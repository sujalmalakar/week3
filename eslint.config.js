export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        console: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
];
