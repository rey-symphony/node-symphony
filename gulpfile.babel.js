import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const plugins = gulpLoadPlugins();

gulp.task('compile', () => {
	return gulp.src('source/**/*.ts')
             .pipe(plugins.typescript())   
             .pipe(gulp.dest("dist"));
});

gulp.task('mocha', ['compile'], () => {
  return gulp.src('mocha_test/*.spec.js')
             .pipe(plugins.mocha());
});

gulp.task('dev', ['mocha'], () => {
  gulp.watch(['source/**', 'mocha_test/*.spec.js'], ['mocha']);
});

