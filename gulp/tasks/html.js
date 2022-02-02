import fileinclude from 'gulp-file-include';
import gulpHtmlImgWrapper from 'gulp-html-img-wrapper';
import gulpVersionNumber from 'gulp-version-number';

export function html() {
  return app.gulp
    .src(app.path.src.html)
    .pipe(fileinclude())
    .pipe(app.plugins.gulpReplace(/@img\//g, './img/'))
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        gulpHtmlImgWrapper({
          classMove: true,
        })
      )
    )
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        gulpVersionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
}
