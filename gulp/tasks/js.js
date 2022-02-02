import webpack from 'webpack-stream';
import vinylNamed from 'vinyl-named';

export const js = function () {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(app.plugins.gulpReplace(/@img\//g, '../img/'))
    .pipe(vinylNamed())
    .pipe(
      webpack({
        mode: app.isBuild ? 'production' : 'development',
      })
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());
};
