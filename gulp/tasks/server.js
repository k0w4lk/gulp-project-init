export const server = function () {
  app.plugins.browserSync.init({
    server: {
      baseDir: app.path.build.html,
    },
    notify: true,
    port: 3000,
  });
};
