var gulp   = require('gulp');
var Potion = require('cakephp-potion');

var $ = Potion.Plugins;
var config = Potion.config;


/*
 |----------------------------------------------------------------
 | CoffeeScript Compilation
 |----------------------------------------------------------------
 |
 | This task will compile your CoffeeScript, minify it, and then
 | optionally generate a "manifest" file that helps with your
 | browser cache-busting of previous versions of your code.
 |
 */

Potion.extend('coffee', function(src, output, options) {
    new Potion.Task('coffee', function() {
        var paths = prepGulpPaths(src, output);

        this.log(paths.src, paths.output);

        return (
            gulp
            .src(paths.src.path)
            .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
            .pipe($.coffee(options || config.js.coffee.options)
                .on('error', function(e) {
                    new Potion.Notification('CoffeeScript Compilation Failed!');

                    this.emit('end');
                }))
            .pipe($.concat(paths.output.name))
            .pipe($.if(config.production, $.uglify()))
            .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(new Potion.Notification('CoffeeScript Compiled!'))
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
