module.exports = {
  webpack: {
    configure: {
      output: {
        filename: 'static/js/atomicaApp.js'
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: {
          chunks(chunk) {
            return false
          },
        },
      },
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.plugins[5].options.filename = 'static/css/atomicaApp.css';
          return webpackConfig;
        },
      },
      options: {}
    }
  ],
}