var fs = require('fs');
var gulp = require('gulp');
var _ = require('underscore');
var gutils = require('gulp-util');


/**
 * Potion is a wrapper around Gulp.
 *
 * @param {Function} recipe
 */
var Potion = function(recipe) {
    // We'll start by loading all of the available tasks.
    require('require-dir')('./tasks');

    // The user may then choose which tasks they want.
    recipe(Potion.mixins);

    // Now that the user has requested their desired tasks
    // from the Gulpfile, we'll initialize everything!
    createGulpTasks.call(Potion);
};


Potion.mixins       = {};
Potion.Log          = require('./Logger');
Potion.Notification = require('./Notification');
Potion.GulpPaths    = require('./GulpPaths');
Potion.config       = config = require('./Config');
Potion.Task         = require('./Task')(Potion);
Potion.tasks        = config.tasks;
Potion.Plugins      = require('gulp-load-plugins')();


/**
 * Register a new task with Potion.
 *
 * @param {string}   name
 * @param {Function} callback
 */
Potion.extend = function(name, callback) {
    Potion.mixins[name] = function() {
        callback.apply(this, arguments);

        return this.mixins;
    }.bind(this);
};


/**
 * Allow for config overrides, via a potion.json file.
 *
 * @param {string} file
 */
Potion.setDefaultsFrom = function(file) {
    var overrides;

    if (fs.existsSync(file)) {
        overrides = JSON.parse(fs.readFileSync(file, 'utf8'));

        _.mixin({
            deepExtend: require('underscore-deep-extend')(_)
        });

        _.deepExtend(Potion.config, overrides);
    }
}('potion.json');


/**
 * Create the actual Gulp tasks dynamically,
 * based upon the chosen Potion mixins.
 */
var createGulpTasks = function() {
    var tasks = this.tasks;

    tasks.forEach(function(task) {
        if (_.contains(gulp.tasks, task.name)) return;

        gulp.task(task.name, function() {
            // If the user is running gulp watch or gulp *task from the
            // command line, then we'll trigger the current Gulp task
            // logic as many times as was requested in the Gulpfile.
            // Example: mix.sass('app.scss').sass('admin.scss').
            if (_.intersection(gutils.env._, [task.name, 'watch', 'tdd']).length) {
                return _.where(tasks, { name: task.name })
                    .forEach(function(task) {
                        task.run();
                    });
            }

            // On the other hand, if the user just triggered `gulp`,
            // then we can simply run the task, badabingbadaboom.
            var gulp = Potion.Task.find(task.name).run();

            // This is a little tricky. With Potion, a single Gulp task
            // can be triggered multiple times, with unique sets of
            // data - which you provide, when you do mix.task().

            // The kicker is that, when the Gulp task is triggered,
            // we must know which set of data you want to use. So
            // we increment an index each time the task is run.

            // The Task.find method will then, when called, properly
            // return the correct data that corresponds to the
            //  active index for the current task. Got it?
            Potion.config.activeTasks[task.name]++;

            return gulp;
        });
    });
};

module.exports = Potion;