
const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve('./src/app','app.tsx')
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    },
    devtool: 'source-map',
    resolve: {
        modules: ['node_modules'],

        extensions: [ '.mjs',
            '.web.ts',
            '.ts',
            '.web.tsx',
            '.tsx',
            '.web.js',
            '.js',
            '.json',
            '.web.jsx',
            '.jsx', '.css'],
        plugins : [
            new TsconfigPathsPlugin()
        ]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 3030
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
              include: path.resolve(__dirname, 'src'),
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true
              }
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
          {  test: /\.(sa|sc|c)ss$/,
            include: [path.resolve(__dirname, 'src/app'), path.resolve(__dirname, 'node_modules')],
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
          },
            // {
            //     test: /\.(sa|sc|c)ss$/,
            //     use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            //     // use: [
            //     //     MiniCssExtractPlugin.loader,
            //     //     "css-loader"
            //     // ]
            // },

          //
          {
            test: /\.svg$/,
            use: [
              {loader: 'url-loader'},
              {
                loader: 'svg-colorize-loader',
                options: {
                  color1: '#000010',
                  color2: '#2FFFFF'
                }
              }
            ]
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'app', 'index.html'), favicon:  './slit.png' }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "App.css",
            chunkFilename: "[id].css"
        }),
      new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
        tsconfig: 'tsconfig.json',
        tslint:  'tslint.json'
      }),
    ]
}
