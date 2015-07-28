var gulp = require('gulp');
var Potion = require('cakephp-potion');

var $ = Potion.Plugins;


/*
 |----------------------------------------------------------------
 | Copying
 |----------------------------------------------------------------
 |
 | This task offers a simple way to copy files from one place to
 | another. No more complicated than that! You may either set
 | a single file or alternatively you can copy a full dir.
 |
 */

Potion.extend('copy', function(src, output) {
    var paths = prepGulpPaths(src, output);

    new Potion.Task('copy', function() {
        this.log(paths.src, paths.output);

        return (
                gulp
                        .src(!paths.src.isDir ? paths.src.path : [paths.src.path, paths.src.baseDir + '/.*'])
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
    var paths = new Potion.GulpPaths();
    if (src[0] == ':') { paths = paths.src(src.substring(1), config.get('assets.root.folder')); }
    else { paths = paths.src(src); }
    if (output[0] == ':') { paths = paths.output(config.get('public.root.outputFolder') + '/' + output.substring(1)); }
    else { paths = paths.output(output); }
    return paths;
};
