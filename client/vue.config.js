module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/style/_global.scss";
        `
      }
    }
  }
};
