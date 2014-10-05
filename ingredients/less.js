var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../Elixir').config;


/*
 |--------------------------------------------------------------------------
 | Less Compilation
 |--------------------------------------------------------------------------
 |
 | This task will compile your Less, auto-prefix it, minify it, and then
 | generate a manifest file, to help with automatic cache-busting.
 |
 */
gulp.task('less', function() {
    var onError = function(err) {
        plugins.notify.onError({
            title:    "Gulp",
            subtitle: "Compilation Failed!",
            message:  "Error: <%= error.message %>",
            icon: __dirname + '/../icons/laravel.png'
        })(err);

        this.emit('end');
    };

    var getSrc = function() {
        var src = config.preprocessors.less.src;

        var providedDirectSrc = function(src) {
            return src.indexOf('.less') > -1;
        };

        return providedDirectSrc(src) ? src : src + '/**/*.less';
    };

    gulp.src(getSrc())
        .pipe(plugins.less()).on('error', onError)
        .pipe(plugins.autoprefixer())
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(config.preprocessors.less.output))
        .pipe(plugins.notify({
            title: 'Less',
            subtitle: 'Compiled!',
            icon: __dirname + '/../icons/laravel.png',
            message: ' '
        }));
});