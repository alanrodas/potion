var gulp = require('gulp');
var gutil = require('gulp-util');
var babelify = require('babelify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var Potion = require('cakephp-potion');
var browserify = require('browserify');
var partialify = require('partialify');
var source = require('vinyl-source-stream');

var bundle;
var $ = Potion.Plugins;
var config = Potion.config;


/*
 |----------------------------------------------------------------
 | Browserify Task
 |----------------------------------------------------------------
 |
 | This task will manage your entire Browserify workflow, from
 | scratch! Also, it will channel all files through Babelify
 | so that you may use all the ES6 goodness you can stand.
 |
 */

Potion.extend('browserify', function(src, output, baseDir, options) {
    var paths = prepGulpPaths(src, baseDir, output);

    new Potion.Task('browserify', function() {
        var stream = config.js.browserify.watchify.enabled
            ? watchifyStream
            : browserifyStream;

        bundle = function(stream) {
            this.log(paths.src, paths.output);

            return (
                stream
                .bundle()
                .on('error', function(e) {
                    new Potion.Notification().error(e, 'Browserify Failed!');

                    this.emit('end');
                })
                .pipe(source(paths.output.name))
                .pipe(buffer())
                .pipe($.if(config.production, $.uglify()))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Potion.Notification('Browserify Compiled!'))
            );
        }.bind(this);

        return bundle(
            stream({
                src: paths.src.path,
                options: options || config.js.browserify.options
            })
        );
    })
    // We'll add this task to be watched, but Watchify
    // will handle the process, to speed things up.
    .watch();
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string}       baseDir
 * @param  {string|null}  output
 */
var prepGulpPaths = function(src, baseDir, output) {
    baseDir = baseDir || config.get('assets.js.folder');

    return new Potion.GulpPaths()
        .src(src, baseDir)
        .output(output || config.get('public.js.outputFolder'), 'bundle.js');
};


/**
 * Get a standard Browserify stream.
 *
 * @param {string|array} src
 * @param {object}       options
 */
var browserifyStream = function(data) { // just use two arguments
    var stream = browserify(data.src, data.options);

    config.js.browserify.transformers.forEach(function(transformer) {
        stream.transform(
            require(transformer.name), transformer.options || {}
        )
    });

    return stream;
};


/**
 * Get a Browserify stream, wrapped in Watchify.
 *
 * @param {object} data
 */
var watchifyStream = function(data) {
    var browserify = watchify(
        browserifyStream(data),
        config.js.browserify.watchify.options
    );

    browserify.on('log', gutil.log);
    browserify.on('update', function() {
        bundle(browserify);
    });

    return browserify;
};
