import webpack from 'webpack-stream';
import vinylNamed from 'vinyl-named';

export const js = function () {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(vinylNamed())
    .pipe(
      webpack({
        mode: app.isBuild ? 'production' : 'development',
        module: {
          rules: [
            {
              test: /\.(css|sass|scss)$/,
              use: [
                {
                  loader: 'style-loader',
                },
                {
                  loader: 'css-loader',
                },
                {
                  loader: 'sass-loader',
                },
              ],
            },
          ],
        },
      })
    )
    .pipe(app.plugins.gulpReplace(/@images\//g, '../images/'))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());
};
