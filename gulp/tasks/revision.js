import rev from 'gulp-rev';
import revRewrite from 'gulp-rev-rewrite';
import revDel from 'gulp-rev-delete-original';
import { appConfig } from '../config/app.js';

export function revision() {
  return appConfig.gulp
    .src('./dist/**/*.{css,js,png,svg,jpeg,gif,jpg,webp}')
    .pipe(rev())
    .pipe(appConfig.gulp.src('./dist/**/*.html'))
    .pipe(revRewrite())
    .pipe(appConfig.gulp.dest('dist'))
    .pipe(revDel());
}
