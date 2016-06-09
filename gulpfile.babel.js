import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const plugins = gulpLoadPlugins();

gulp.task('compile', () => {
  var tsResult = gulp.src([
    'source/**/*.ts',
    'typings/**/*.ts'
  ])
  .pipe(plugins.typescript({
    //declaration: true,
    noExternalResolve: true
  }));

  /*tsResult.dts
  .pipe(plugins.concat("node-symphony.d.ts"))
  .pipe(gulp.dest('dist'));*/

  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('test', ['compile'], () => {
  return gulp.src('mocha_test/*.spec.js')
 .pipe(plugins.mocha());
});

gulp.task('dev', ['mocha'], () => {
  gulp.watch(['source/**', 'mocha_test/*.spec.js'], ['mocha']);
});

