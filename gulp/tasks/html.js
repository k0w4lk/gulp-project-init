import fileInclude from 'gulp-file-include';
import gulpHtmlImgWrapper from 'gulp-html-img-wrapper';
import gulpVersionNumber from 'gulp-version-number';
import { appConfig } from '../config/app.js';
import { fileIncludeContent } from '../file-include-content.js';

export function html() {
  return appConfig.gulp
    .src(appConfig.path.src.html)
    .pipe(fileInclude({ context: fileIncludeContent }))
    .pipe(appConfig.plugins.gulpIf(appConfig.isBuild, gulpHtmlImgWrapper()))
    .pipe(
      appConfig.plugins.gulpIf(
        appConfig.isBuild,
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
        }),
      ),
    )
    .pipe(appConfig.plugins.gulpReplace(/@images\//g, './images/'))
    .pipe(appConfig.gulp.dest(appConfig.path.build.html))
    .pipe(appConfig.plugins.browserSync.stream());
}
