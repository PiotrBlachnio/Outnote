module.exports = {
  transpileDependencies: ['vuex-persist'],
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
