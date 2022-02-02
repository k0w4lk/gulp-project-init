import fs from 'fs';
import fonter from 'gulp-fonter-unx';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = function () {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(
      fonter({
        formats: ['ttf'],
      })
    )
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

export const ttfToWoff = function () {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      fonter({
        formats: ['woff'],
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

export const fontsStyle = function () {
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);
        for (let i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split('.')[0];
          if (fontFileName !== undefined) {
            let fontName = fontFileName.split('-')[0]
              ? fontFileName.split('-')[0]
              : fontFileName;
            let fontWeight = fontFileName.split('-')[1]
              ? fontFileName.split('-')[1]
              : fontFileName;
            switch (fontWeight.toLowerCase()) {
              case 'thin':
                fontWeight = 100;
                break;
              case 'extralight':
                fontWeight = 200;
                break;
              case 'light':
                fontWeight = 300;
                break;
              case 'medium':
                fontWeight = 500;
                break;
              case 'semibold':
                fontWeight = 600;
                break;
              case 'bold':
                fontWeight = 700;
                break;
              case 'extrabold':
              case 'heavy':
                fontWeight = 800;
                break;
              case 'black':
                fontWeight = 900;
                break;

              default:
                fontWeight = 400;
                break;
            }

            fs.appendFile(
              fontsFile,
              `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
              cb
            );
          }
        }
      } else {
        console.log(
          'File scss/fonts.scss already exists. Delete it to update.'
        );
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
};
