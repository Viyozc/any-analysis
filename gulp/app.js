/**
 * Created by hlkjsen on 2017/4/25.
 */
var gulp = require('gulp');
var NwBuilder = require('nw-builder');
var util = require('gulp-util');
var dir = require('./config.js');

gulp.task('build',['css','js','html','assets']);

gulp.task('app',function () {
    var nw = new NwBuilder({
        version: '0.22.3',
        files:'./build/**',
        // winIco: "./icons/icon.ico",
        macIcns: './icons/icon.icns',
        // macPlist: {mac_bundle_id: 'xcaseEditorPkg'},
        buildDir: './buildApp',
        platforms: ['osx64']/*['osx64', 'linux', 'win32']*/
    });

    nw.on('log',function (msg) {
        console.log(msg)
    });

    return nw.build().catch(function (err) {
        util.log('error+++', err);
    })

});


