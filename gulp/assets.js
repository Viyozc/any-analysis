var gulp   = require('gulp');
var dir    = require('./config');

//copy assets files
gulp.task('assets', ['lib'], function () {
    return gulp.src(dir.assets.src)
        .pipe(gulp.dest(dir.assets.dest))

});
//copy lib files
gulp.task('lib', function () {
    gulp.src(dir.lib.lib1.src)
        .pipe(gulp.dest(dir.lib.lib1.dest));
    gulp.src(dir.lib.lib2.src)
        .pipe(gulp.dest(dir.lib.lib2.dest));
    // gulp.src(dir.lib.lib1.src)
    //     .pipe(gulp.dest(dir.lib.lib1.dest))
});