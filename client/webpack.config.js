const path = require('path');

//modulo do node configurável
module.exports = {
    //local de entrada entrada
    entry: './app-src/app.js',
    // arquivo de saaída 
    output: {
        filename: 'bundle.js',
        //caminho atual + dist
        path: path.resolve(__dirname, 'dist')
    }
}