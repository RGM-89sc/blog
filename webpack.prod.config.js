const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CreateMarkDownMapPlugin = require('@rgm-89sc/create-markdown-map-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:8].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash].css',
      chunkFilename: 'css/[id].[fullhash].css',
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
        const content = markdownString.replace(/^-{3,}(?:.|[\r\n])+-{3,}/, '')
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
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,  // exclude优先级会更高
        include: [
          path.resolve(__dirname, 'node_modules/highlight.js'),
          path.resolve(__dirname, 'src/pages/'),
          path.resolve(__dirname, 'src/components/'),
        ],
        use: [ 
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      })
    ],
    splitChunks: {  // 抽离公共模块
      chunks: 'all',
      minSize: 24000,
      maxSize: 24000,
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