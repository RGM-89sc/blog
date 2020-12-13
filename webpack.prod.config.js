const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CreateMarkDownMapPlugin = require('@rgm-89sc/create-markdown-map-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:8].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
        }
      ]
    }),
    new CleanWebpackPlugin(),
    new CreateMarkDownMapPlugin({
      dirPath: path.join(__dirname, './src/assets/post'),
      interceptor: (parser, markdownString) => {
        markdownString = markdownString.replace(/^[\r\n ]+/, '')
        const content = markdownString.replace(/^-{3,}(?:.|\n)+-{3,}/, '')
        const metaString = markdownString.slice(0, markdownString.length - content.length)
        const titleMatchResult = metaString.match(/\[title\]:([^\r\n\[]+)/i)
        const timeMatchResult = metaString.match(/\[time\]:([^\r\n\[]+)/i)
        const tagsMathResult = metaString.match(/\[tags\]:([^\r\n\[]+)/i)
        return {
          meta: {
            title: titleMatchResult && titleMatchResult[1] ? titleMatchResult[1].trim() || '' : '',
            time: timeMatchResult && timeMatchResult[1] ? timeMatchResult[1].trim() || '' : '',
            tags: tagsMathResult && tagsMathResult[1] ? tagsMathResult[1].split(';').filter(tag => tag).map(tag => tag.trim()) : []
          },
          html: parser(content)
        }
      },
      dist: {
        mode: 'localStorage',
        path: '_posts'
      },
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      // {
      //   test: /\.md$/,
      //   use: [
      //     {
      //       loader: '@rgm-89sc/markdown-webpack-loader',
      //       options: {

      //       }
      //     }
      //   ]
      // }
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        canPrint: true,
        discardComments: true
      })
    ],
    splitChunks: {  // 抽离公共模块
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      cacheGroups: {
        framework: {
          test: "framework",
          name: "framework",
          enforce: true
        },
        vendors: {
          priority: -10,
          test: /node_modules/,
          name: "vendor",
          enforce: true,
        },
      }
    }
  },
})