const path = require('path');
const { execSync } = require('child_process');
const chokidar = require('chokidar');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function debounce(func, timeout) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
}

function build() {
  execSync('npm run build', (error, stdout, stderr) => console.log(stdout));
}

class OpenApiPlugin {
  apply(compiler) {
    const watcher = chokidar.watch(path.resolve(__dirname, 'openapi'));

    watcher.on('change', debounce((event, path) => {
      build();
    }), 200);

    build();

    compiler.hooks.beforeCompile.tapAsync('MyPlugin', (params, callback) => {
      if (!compiler.watchMode) {
        watcher.close();
      }
      callback();
    });
  }
}

module.exports = {
  mode: 'development',
  entry: {
    app: require.resolve('./docs/index'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.yaml$/,
        use: [
          { loader: 'json-loader' },
          { loader: 'yaml-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  plugins: [
    new OpenApiPlugin(),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, 'docs/favicon.png'),
      template: path.resolve(__dirname, 'docs/index.html'),
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
  },
};
