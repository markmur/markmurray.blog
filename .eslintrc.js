module.exports = {
  parser: 'babel-eslint',
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'literal',
        schemaJsonFilepath: path.resolve(__dirname, './schema.json'),
      },
    ],
  },
  plugins: ['graphql'],
  eslintConfig: {
    extends: ['xo', 'xo-typescript'],
  },
};
