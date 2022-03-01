import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = function () {
  return app.gulp
    .src(app.path.src.images)
    .pipe(app.plugins.gulpNewer(app.path.build.images))
    .pipe(app.plugins.gulpIf(app.isBuild, webp()))
    .pipe(app.plugins.gulpIf(app.isBuild, app.gulp.dest(app.path.build.images)))
    .pipe(app.plugins.gulpIf(app.isBuild, app.gulp.src(app.path.src.images)))
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        app.plugins.gulpNewer(app.path.build.images)
      )
    )
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3,
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.nonconvertibleImages))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browserSync.stream());
};
