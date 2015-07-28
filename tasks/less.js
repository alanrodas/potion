var gulp    = require('gulp');
var compile = require('./shared/Css');
var Potion = require('cakephp-potion');

var config = Potion.config;


/*
 |----------------------------------------------------------------
 | Less Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Less, including minification and
 | and auto-prefixing. Less is one of the CSS pre-processors
 | supported by Potion, along with the Sass CSS processor.
 |
 */

Potion.extend('less', function(src, output, options) {
    new Potion.Task('less', function() {
        var paths = prepGulpPaths(src, output);

        return compile({
            name: 'Less',
            compiler: require('gulp-less'),
            src: paths.src,
            output: paths.output,
            task: this,
            pluginOptions: options || config.css.less.pluginOptions
        });
    })
    .watch(config.get('assets.css.less.folder') + '/**/*.less');
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
        .src(src, config.get('assets.css.less.folder'))
        .output(output || config.get('public.css.outputFolder'), 'app.css');
};
