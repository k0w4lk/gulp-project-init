import * as gulpTypescript from 'gulp-typescript';
import { appConfig } from '../config/app';

const tsProject = gulpTypescript.createProject('../../tsconfig.json');

export const ts = () =>
  tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(appConfig.gulp.dest(appConfig.path.build.js))
    .pipe(appConfig.plugins.browserSync.stream());
