const path=require('path');
const webpack=require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { ReactLoadablePlugin } =require('react-loadable/webpack') ;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GoogleFontsPlugin = require("google-fonts-webpack-plugin");
const isServer=process.env.BUILD_TYPE==='server';
const rootPath=path.join(__dirname,'../');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');

const includePaths = [
    path.resolve(rootPath, 'src'),
    path.resolve(rootPath, 'node_modules/react-geocode')
];

const prodConfig={
  context: path.join(rootPath,'./src'),
  entry: {
    client:[bootstrapEntryPoints.prod, './index.js'],
    vendors:['react','react-dom','react-loadable','react-redux','redux','react-router-dom','react-router-redux','redux-thunk'],
  },
  output:{
    filename:'[name].[hash:8].js',
    path:path.resolve(rootPath,'./dist'),
    publicPath:'/',
    chunkFilename: '[name]-[hash:8].js',
    // libraryTarget: isServer?'commonjs2':'umd',
  },
  resolve:{
    extensions:[".js",".jsx",".css",".less",".scss",".png",".jpg"],
    modules:[path.resolve(rootPath, "src"), "node_modules"],
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        include: includePaths,
        use:{
          loader:'babel-loader',
          options:{
            presets: ['env', 'react', 'stage-0', 'es2015'],
            plugins: ['transform-runtime', 'add-module-exports', ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]],
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
        test: /\.(svg|ttf|eot)(\?.*)?$/i,
        exclude:/node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'image/[sha512:hash:base64:7].[ext]'
          }
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
         use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[ext]'
            }
          }
        ]
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      // Bootstrap 3
      { test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery' },
    ]
  },
  plugins:[
    new ManifestPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'css/style.[hash].css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([{from:'favicon.ico',to:rootPath+'./dist'}]),
    new CleanWebpackPlugin(['./dist'],{root: rootPath,}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      title:'Twitte-Lite',
      publicUrl: './',
      filename:'index.html',
      template:'./index.ejs',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:['vendors','manifest'],
      minChunks:2
    }),
    new ReactLoadablePlugin({
      filename: path.join(rootPath,'./dist/react-loadable.json'),
    }),
    new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          ecma: 8,
        }
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
  ]
}

module.exports=prodConfig
