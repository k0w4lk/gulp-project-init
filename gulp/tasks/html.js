import fileInclude from 'gulp-file-include';
import gulpFormatHtml from 'gulp-format-html';
import gulpHtmlImgWrapper from 'gulp-html-img-wrapper';
import i18n from 'gulp-i18n-localize';
import { appConfig } from '../config/app.js';
import { fileIncludeContent } from '../file-include-content.js';

export function html() {
  return appConfig.gulp
    .src(appConfig.path.src.html)
    .pipe(fileInclude({ context: fileIncludeContent }))
    .pipe(
      i18n({
        locales: appConfig.langs,
        localeDir: './src/assets/i18n',
      })
    )
    .pipe(gulpHtmlImgWrapper())
    .pipe(gulpFormatHtml())
    .pipe(appConfig.gulp.dest(appConfig.path.build.html))
    .pipe(appConfig.plugins.browserSync.stream());
}
