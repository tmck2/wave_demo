var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});
 
gulp.task('reload', function () {
  gulp.src(['*.*','components/*.*'])
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['*.*','components/*.*'], ['reload']);
});
 
gulp.task('default', ['connect', 'watch']);

gulp.task('heroku:prod', []);
