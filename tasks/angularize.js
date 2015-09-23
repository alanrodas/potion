var gulp = require('gulp');
var ngClassify = require('gulp-ng-classify');
var coffee = require('gulp-coffee');
var Potion = require('cakephp-potion');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');

var $ = Potion.Plugins;

/*
 |----------------------------------------------------------------
 | Angularize
 |----------------------------------------------------------------
 |
 | Pass the coffee file through ng-classify, so you can use classes
 | as angular controllers. Merging this files and compiling then
 | in JS format.
 |
 */

Potion.extend('angularize', function(src, output, options) {
    if (typeof output !== 'string') {
        options = output; output = null;
    }
    if ((typeof src !== 'string') && (!Array.isArray(src))) {
        options = src; src = '**/*.coffee';
    }

    var paths = prepGulpPaths(src, output);

    options.appName = options.appName || 'app';
    options.factory = options.factory || {format: 'camelCase'};
    options.controller = options.controller || {format: 'upperCamelCase', suffix: ''};

    new Potion.Task('angularize', function() {
        this.log(paths.src, paths.output);

        return (
            gulp
                .src(paths.src.path, { base: config.get('assets.js.coffee.folder') })
                .pipe(plumber())
                .pipe(sourcemaps.init())
                .pipe($.concat('app.coffee'))
                .pipe(ngClassify(options))
                .pipe(coffee({bare: true}))
                .pipe(sourcemaps.write('.'))
                .pipe($.if(! paths.output.isDir, $.rename(paths.output.name)))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Potion.Notification('Angularize Finished!'))
        );
    })
        .watch(config.get('assets.js.coffee.folder') + '/**/*.coffee')
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, output) {
    return new Potion.GulpPaths()
        .src(src, config.get('assets.js.coffee.folder'))
        .output(output || config.get('public.js.outputFolder'), 'app.js');
};
