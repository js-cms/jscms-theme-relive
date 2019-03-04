/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pageConfig = require('./page.config');

let webpackConfig = {
  mode: 'development',
  // 配置入口
  entry: {},
  // 配置出口
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: 'static/js/[name].[hash:7].js',
    publicPath: '/'
  },
  externals : {
    'jquery' : 'window.jQuery'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.join(__dirname, './src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      // 处理html中的img标签
      {
        test: /\.html$/,
        loader: 'html-withimg-loader',
        include: [path.join(__dirname, './src')],
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, './src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      ['dist/*'],
      {
        root: __dirname,
        verbose: true,
        dry: false
      }
    ),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/libs',
      to: "libs/",
    }])
  ],
  // 起本地服务
  devServer: {
    contentBase: './dist/',
    historyApiFallback: true,
    inline: true,
    hot: true,
    open: true,
    host: '127.0.0.1'
  }
}

if (pageConfig && Array.isArray(pageConfig)) {
  pageConfig.map(page => {
    webpackConfig.entry[page.name] = `./src/pages/${page.jsEntry}`;
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      filename: path.join(__dirname, `/dist/${page.name}.html`),
      template: path.join(__dirname, `/src/pages/${page.html}`),
      text: "text",
      inject: true,
      chunks: [page.name],
      inlineSource: '.(js|css)$',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }))
  });
}

module.exports = webpackConfig;