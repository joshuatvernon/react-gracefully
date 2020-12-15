const path = require('path');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          useCache: true,
          presets: [['react-app', { flow: false, typescript: true }]],
          configFileName: path.resolve(__dirname, 'tsconfig.json')
        }
      }
    ]
  });

  config.resolve.extensions.push('.ts', '.tsx');
  config.node = {
    __dirname: true
  };
  return config;
};
