var gulp = require('gulp');
var Potion = require('cakephp-potion');


/*
 |----------------------------------------------------------------
 | Custom Gulp Tasks
 |----------------------------------------------------------------
 |
 | Sometimes, you'll want to hook your custom Gulp tasks into
 | Potion. Simple! Simply call Potion's task() method, and
 | provide the name of your task, and a regex to watch.
 |
 */

Potion.extend('task', function(name, watcher) {
    var task = new Potion.Task('task', function() {
        return gulp.start(name);
    });

    if (watcher) {
        task.watch(watcher);
    }
});
