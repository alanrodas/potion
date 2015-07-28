var gulp = require('gulp');
var coffeeify = require('gulp-coffeeify');
var Potion = require('cakephp-potion');

var $ = Potion.Plugins;


/*
 |----------------------------------------------------------------
 | Coffeeify
 |----------------------------------------------------------------
 |
 | This task will compile your CoffeeScript, by coffeeifying them
 | and saving them to a given output folder.
 |
 */

Potion.extend('coffeeify', function(src, output) {
    var paths = prepGulpPaths(src, output);

    new Potion.Task('coffeeify', function() {
        this.log(paths.src, paths.output);

        return (
                gulp
                        .src(paths.src.path)
                        .pipe(coffeeify())
                        .pipe($.if(! paths.output.isDir, $.rename(paths.output.name)))
                        .pipe(gulp.dest(paths.output.baseDir))
        );
    })
            .watch(paths.src.path)
            .ignore(paths.output.path);
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