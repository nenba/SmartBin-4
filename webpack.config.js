const path = require('path');

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.js$/,
    include: path.join(__dirname, 'src'),
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: [require.resolve('react-refresh/babel')],
        },
      },
    ],
  });

  return config;
};