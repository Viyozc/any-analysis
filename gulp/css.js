var gulp = require('gulp');
var sass = require('gulp-sass');
var cssDir = require('./config.js').css;
var autoPrefixer = require('gulp-autoprefixer');

//sass compile compress prefix
gulp.task('css',function () {
    return gulp.src(cssDir.src)
    .pipe(sass.sync().on('error',sass.logError))
        .pipe(sass({outputStyle: 'compressed'}).on('error',  sass.logError))
        .pipe(autoPrefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(cssDir.dest))
});