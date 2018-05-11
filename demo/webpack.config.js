const path = require('path')
const easyConfigMock = require('easy-config-mock')
const HtmlWebpackPlugin = require('html-webpack-plugin');

new easyConfigMock({
  path: path.join(__dirname, './mock.config.js')
})

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    port: 3004,
    inline: true,
    quiet: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
