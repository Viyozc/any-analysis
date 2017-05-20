var gulp  = require('gulp');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var dir   = require('./config');

gulp.task('clean',function () {
    gulp.src(dir.clean.src,{read:false})
        .pipe(clean())
});

gulp.task('watch', ['css','js','html','assets'], function () {
    gulp.watch(dir.css.src,['css']);
    gulp.watch(dir.js.src, ['js']);
    gulp.watch(dir.html.src, ['html']);
    // watch(dir.css.src, function () {
    //     gulp.run('css');
    // });
    // watch(dir.js.src,function () {
    //     gulp.run('js')
    // });
    // watch(dir.html.src,function () {
    //     gulp.run('html')
    // })
});