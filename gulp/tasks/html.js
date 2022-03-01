import fileInclude from 'gulp-file-include';
import gulpHtmlImgWrapper from 'gulp-html-img-wrapper';
import gulpVersionNumber from 'gulp-version-number';
import { fileIncludeContent } from '../file-include-content.js';

export function html() {
  return app.gulp
    .src(app.path.src.html)
    .pipe(fileInclude({ context: fileIncludeContent }))
    .pipe(app.plugins.gulpIf(app.isBuild, gulpHtmlImgWrapper()))
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
    .pipe(app.plugins.gulpReplace(/@images\//g, './images/'))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
}
