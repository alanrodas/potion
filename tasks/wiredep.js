var gulp = require('gulp');
var Potion = require('cakephp-potion');
var wiredep = require('wiredep').stream;

var $ = Potion.Plugins;


/*
 |----------------------------------------------------------------
 | Wiredep
 |----------------------------------------------------------------
 |
 | This task wiredeps all dependencies from the vendor folder in
 | your public directory. This adds all the dependencies installed
 | in your bower.json file to the file you specify.
 |
 */

Potion.extend('wiredep', function(file, options) {
    var paths = new Potion.GulpPaths()
            .src(file, config.get('views.root.folder'))
            .output(config.get('views.root.folder') + '/' + file);

    options = options || {};
    options.directory = options.directory || config.get('public.root.vendor');
    options.ignorePath = options.ignorePath || '../../webroot';

    options.fileTypes = options.fileTypes || {
        php: {
            block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
            detect: {
                js: /<script.*src=['"]([^'"]+)/gi,
                css: /<link.*href=['"]([^'"]+)/gi,
                html: /<link.*href=['"]([^'"]+)/gi
            },
            replace: {
                js: '<script src="{{filePath}}"></script>',
                css: '<link rel="stylesheet" href="{{filePath}}" />',
                html: '{{filePath}}'
            }
        }
    };

    new Potion.Task('wiredep', function() {
        this.log(paths.src, paths.output);

        return (
                gulp
                        .src(paths.src.path)
                        .pipe(wiredep(options))
                        .pipe(gulp.dest(paths.output.baseDir))
        );
    })
            .watch(paths.src.path)
            .ignore(paths.output.path);

});
