var gulp = require('gulp');
var Potion = require('cakephp-potion');

var $ = Potion.Plugins;


/*
 |----------------------------------------------------------------
 | Copying Wiredep Bower Dependencies
 |----------------------------------------------------------------
 |
 | This task offers a simple way to copy all bower file from bower
 | folder to the vendor folder in the public directory
 |
 */

Potion.extend('wirecopy', function() {
    var paths = new Potion.GulpPaths()
            .src('', config.get('bower.root.folder'))
            .output(config.get('public.root.vendor'));

    new Potion.Task('wirecopy', function() {
        this.log(paths.src, paths.output);

        return (
                gulp
                        .src(paths.src.path)
                        .pipe(gulp.dest(paths.output.path))
        );
    })
            .watch(paths.src.path)
            .ignore(paths.output.path);

});
