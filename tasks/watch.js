var gulp = require('gulp');
var _ = require('underscore');
var Potion = require('cakephp-potion');


/*
 |----------------------------------------------------------------
 | Watcher
 |----------------------------------------------------------------
 |
 | When you want to keep an eye on your files for changes, and
 | then re-trigger Gulp, then you should use the gulp watch
 | command. This way, you can auto-compile on each save!
 |
 */
gulp.task('watch', function() {
    var tasks = _.sortBy(Potion.tasks, 'name');

    // Browserify uses a special watcher, so we'll
    // hook into that option, only for gulp watch.

    if (_.contains(_.pluck(tasks, 'name'), 'browserify')) {
    Potion.config.js.browserify.watchify.enabled = true;

        gulp.start('browserify');
    }

    tasks
        .filter(function(task, index) {
            if ( ! task.watch || (task.category != 'default')) {
                return false;
            }

            if (index > 0) {
                return task.name !== tasks[index - 1].name;
            }

            return true;
        })
        .forEach(function(task) {
            gulp.watch(task.watchers, [task.name]);
        });
});
