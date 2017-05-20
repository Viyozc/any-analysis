/**
 * Created by hlkjsen on 2017/4/25.
 */
var src = './app';
var dest = './build';

module.exports = {
    js: {
        src: [src + '/js/**/*.js', '!' + src + '/js/lib/**/*'],
        dest: dest + '/js'
    },
    css: {
        src: [src + '/css/**/*.{scss,css}', '!' + src + '/css/lib/**/*'],
        dest: dest + '/css'
    },
    html: {
        src: src + '/**/*.{html,json}',
        dest: dest + '/'
    },
    assets: {
        src: src + '/assets/**/*',
        dest: dest + '/assets'
    },
    lib: {
        lib1: {
            src: src + '/js/lib/**/*',
            dest: dest + '/js/lib'
        },
        lib2: {
            src: src + '/css/lib/**/*',
            dest: dest + '/css/lib'
        }

    },
    clean: {
        src: dest
    }
}