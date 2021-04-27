module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['react-hooks'],
  rules: {
    'react/jsx-props-no-spreading': 0,
    'arrow-body-style': 0,
  }
};
