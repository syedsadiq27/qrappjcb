const path = require('path');
const { ESLINT_MODES } = require('@craco/craco');

const resolve = arg => path.resolve(__dirname, arg);
module.exports = {
  webpack: {
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === 'ModuleScopePlugin',
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      //   webpackConfig.resolve.alias
      webpackConfig['resolve'] = {
        fallback: {
          stream: require.resolve('stream-browserify'),
        },
      };
      return webpackConfig;
    },
  },
  eslint: {
    mode: ESLINT_MODES?.file,
  },
};
