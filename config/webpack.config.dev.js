const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');
const GoogleFontsPlugin = require("google-fonts-webpack-plugin");
const rootPath=path.join(__dirname,'../');

const devConfig={
  context: path.join(rootPath,'./src'),
  entry:{
    client:[bootstrapEntryPoints.dev, './index.js'],
    vendors:['react','react-dom','react-loadable','react-redux','redux','react-router-dom','react-router-redux','redux-thunk'],
  },
  output:{
    filename:'[name].[hash:8].js',
    path:path.resolve(rootPath,'./dist/client'),
    publicPath:'/',
    chunkFilename: '[name]-[hash:8].js'
  },
  resolve:{
    extensions:[".js",".jsx","css","less","scss","png","jpg"],
    modules:[path.resolve(rootPath, "src"), "node_modules"],
  },
  devServer:{
    contentBase:'assets',
    hot:true,
    historyApiFallback:true,
  },
  devtool:'source-map',
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        include:path.resolve(rootPath, "src"),
        use:{
          loader:'babel-loader',
          options:{
            presets: ['env', 'react', 'stage-0'],
            plugins: ['transform-runtime', 'add-module-exports'],
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
            ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                'less-loader',
            ],
        })
      },
      {
        test: /\.(svg|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        exclude:/node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'image/[sha512:hash:base64:7].[ext]'
          }
        }
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      // Bootstrap 3
      { test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery' },
    ]
  },
  plugins:[
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{from:'favicon.ico'}]),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({summary: false}),
    new ExtractTextPlugin({filename: 'style.[hash].css',}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV||'development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:['vendors','manifest'],
      minChunks:2
    }),
    new HtmlWebpackPlugin({
      title:'test1',
      publicUrl: './',
      filename:'index.html',
      template:'./index.ejs',
    }),
    new GoogleFontsPlugin({
            fonts: [
                { family: "Source Sans Pro" },
                { family: "Roboto", variants: [ "400", "700italic" ] },
                { family: "Berkshire Swash" },
                { family: "Montserrat" },
            ]
            /* ...options */
    }),
  ],
}

module.exports = devConfig
