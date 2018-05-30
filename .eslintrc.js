module.exports = {
  extends: 'google',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'object-curly-spacing': 0,
    'max-len': [1, { code: 120 }],
    'semi': 0,
  },
};
