
const path= require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.config.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CreateMarkDownMapPlugin = require('@rgm-89sc/create-markdown-map-plugin')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].bundle.js',
  },
  devServer: {
    // writeToDisk: true,
    contentBase: path.resolve(__dirname, '../dist'),
    open: false,
    port: 3000,
    compress: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // exclude: /node_modules/,  // exclude优先级会更高
        include: [
          path.resolve(__dirname, 'node_modules/highlight.js'),
          path.resolve(__dirname, 'src/pages/'),
          path.resolve(__dirname, 'src/components/'),
        ],
        use: [ 
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
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
      //         interceptor: (parser, markdownString) => {
      //           markdownString = markdownString.replace(/^[\r\n ]+/, '')
      //           const content = markdownString.replace(/^-{3,}(?:.|\n)+-{3,}/, '')
      //           const metaString = markdownString.slice(0, markdownString.length - content.length)
      //           const titleMatchResult = metaString.match(/\[title\]:([^\r\n\[]+)/i)
      //           const timeMatchResult = metaString.match(/\[time\]:([^\r\n\[]+)/i)
      //           const tagsMathResult = metaString.match(/\[tags\]:([^\r\n\[]+)/i)
      //           return {
      //             meta: {
      //               title: titleMatchResult && titleMatchResult[1] ? titleMatchResult[1].trim() || '' : '',
      //               time: timeMatchResult && timeMatchResult[1] ? timeMatchResult[1].trim() || '' : '',
      //               tags: tagsMathResult && tagsMathResult[1] ? tagsMathResult[1].split(';').filter(tag => tag).map(tag => tag.trim()) : []
      //             },
      //             html: parser(content)
      //           }
      //         }
      //       }
      //     }
      //   ]
      // }
    ],
  },  
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
        }
      ]
    }),
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
  ]
})