const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/email': {
        target: process.env.VUE_APP_ROOT_API,
        changeOrigin: true,
        pathRewrite: {
          '^/email': 'email'
        },
        overlay: {
          warnings: true,
          errors: true
        }
      }
    }
  },
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'uat') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 1024,
            deleteOriginalAssets: false
          })
        ]
      }
    } else {
      return {
        devtool: 'source-map'
      }
    }
  }
}
