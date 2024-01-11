import { appConfig } from '../config/app.js';

export const server = () => {
  const baseDir = [appConfig.path.build.html].concat(
    appConfig.langs.map((lang) => appConfig.path.build.html + lang)
  );

  appConfig.plugins.browserSync.init({
    server: {
      baseDir,
    },
    notify: true,
    port: 3000,
    open: false,
  });
};
