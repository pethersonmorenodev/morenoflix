module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'react/no-array-index-key': 'off',
    'implicit-arrow-linebreak': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'max-len': [
      1,
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
  },
};
