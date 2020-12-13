const path = require('path')

module.exports = {
  entry: {
    app: './src/index.tsx',
    framework: ['react','react-dom'],
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  devtool: "source-map",
  resolve: {
    alias: {
      '@Components': path.resolve(__dirname, './src/components/'),
      '@Pages': path.resolve(__dirname, './src/pages/'),
      '@Tools': path.resolve(__dirname, './src/tools/'),
      '@Types': path.resolve(__dirname, './src/types/'),
      '@Store': path.resolve(__dirname, './src/store/'),
      '@Hooks': path.resolve(__dirname, './src/hooks/')
    },
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            limit: 8192,
          },
        }
      }
    ]
  },
}