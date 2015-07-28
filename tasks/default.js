var gulp = require('gulp');
var _ = require('underscore');
var Potion = require('laravel-elixir');
var inSequence = require('run-sequence');


/*
 |----------------------------------------------------------------
 | Default Task
 |----------------------------------------------------------------
 |
 | This task will run when the developer executes "gulp" on the
 | command line. We'll use this configuration object to know
 | which tasks should be fired when this task is executed.
 |
 */

gulp.task('default', function() {
    inSequence.apply(this, _.pluck(Potion.tasks, 'name'));
});
