var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});
 
gulp.task('reload', function () {
  gulp.src('*.*')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['*.*'], ['reload']);
});
 
gulp.task('default', ['connect', 'watch']);