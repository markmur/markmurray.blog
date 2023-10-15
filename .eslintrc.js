const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'relay',
        schemaJsonFilepath: path.resolve(__dirname, './schema.json'),
        tagName: 'graphql',
      },
    ],
  },
  plugins: ['graphql'],
  eslintConfig: {
    extends: ['xo', 'xo-typescript'],
  },
};
