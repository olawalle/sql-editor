module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("csv")
      .test(/\.csv$/)
      .use("graphql-tag/loader")
      .loader("csv-loader")
      .end();
  },
};
