const path = require('path');

const babiliPlugin = require('babili-webpack-plugin');

let plugins = [];

//process acessa todas as variaveis de ambiente do node
if(process.env.NODE_ENV == 'production'){
    plugins.push(new babiliPlugin());
}

//modulo do node configurável
module.exports = {
    //local de entrada entrada
    entry: './app-src/app.js',
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
            }
        ]
    },

    //declarando que plugins recebe o array plugins (plugins = plugins)
    plugins 
}