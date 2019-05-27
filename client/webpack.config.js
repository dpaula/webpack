const path = require('path');

const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

let plugins = [];

plugins.push(new webpack.ProvidePlugin({
    '$': 'jquery/dist/jquery.js',
    'jQuery': 'jquery/dist/jquery.js'
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js'
}));

plugins.push(new extractTextPlugin('styles.css'));

//process acessa todas as variaveis de ambiente do node
if (process.env.NODE_ENV == 'production') {

    //otimiza o parse dos módulos
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

    //para mimificar o js
    plugins.push(new babiliPlugin());
    //para mimificar separado o css com cssnano
    plugins.push(new optimizeCssAssetsWebpackPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            //remove comentarios da mimificação
            discardComments: {
                removeAll: true
            },
            //abilita saida de erro no console
            canPrint: true
        }
    }));
}

//modulo do node configurável
module.exports = {
    //local de entrada entrada
    entry: './app-src/app.js',
    entry: {
      app: './app-src/app.js',
      vendor: ['jquery', 'bootstrap', 'reflect-metadata']
    },
    // arquivo de saaída 
    output: {
        filename: 'bundle.js',
        //caminho atual + dist
        path: path.resolve(__dirname, 'dist'),
        //definindo o caminho publico do bundle como 'dist/bundle.js'
        publicPath: 'dist'
    },

    module: {
        rules: [
            {
                //expressão regular dizendo pra pegar todos os arquivos js (*.js)
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },

    //declarando que plugins recebe o array plugins (plugins = plugins)
    plugins
}