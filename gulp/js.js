var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var jsDir = require('./config').js;

gulp.task('js',function () {
    return gulp.src(jsDir.src)
        // .pipe(babel({
        //     presets:['es2015']
        // }))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest(jsDir.dest))
});
