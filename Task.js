var _ = require('underscore');

var id = 0, Potion;


/**
 * Create a new Task instance.
 *
 * @param {string}   name
 * @param {Function} description
 */
var Task = function(name, description) {
    this.id = id++;
    this.name = name;
    this.watchers = [];

    if (description) {
        this.describe(description);
    }
};


/**
 * Fetch the task(s) with the given name.
 *
 * @param {string} name
 */
Task.find = function(name) {
    var tasks = _.where(Potion.tasks, { name: name });

    return tasks[Potion.config.activeTasks[name]];
};


/**
 * Describe the task. This is the Gulp definition.
 *
 * @param  {Function} definition
 * @return {Task}
 */
Task.prototype.describe = function(definition) {
    this.definition = definition;

    this.register();

    return this;
};


/**
 * Set the task to be called, when firing `Gulp`.
 */
Task.prototype.register = function() {
    Potion.tasks.push(this);

    Potion.config.activeTasks = Potion.config.activeTasks || {};
    Potion.config.activeTasks[this.name] = 0;

    return this;
};


/**
 * Set a path regex to watch for changes.
 *
 * @param {string}      regex
 * @param {string|null} category
 */
Task.prototype.watch = function(regex, category) {
    if (regex) {
        this.watchers.push(regex);
    }

    this.category = category || 'default';

    return this;
};


/**
 * Exclude the given path from the watcher.
 *
 * @param {string} path
 */
Task.prototype.ignore = function(path) {
    this.watchers.push(('!./' + path).replace('././', './'));

    return this;
};


/**
 * Execute the task definition.
 */
Task.prototype.run = function() {
    return this.definition();
};


/**
 * Log the task input and output.
 *
 * @param {string|array} src
 * @param {string|null}  output
 */
Task.prototype.log = function(src, output) {
    var task = this.name.substr(0,1).toUpperCase() + this.name.substr(1);

    Potion.Log
       .heading("Fetching " + task + " Source Files...")
       .files(src.path ? src.path : src, true);

    if (output) {
        Potion.Log
            .heading('Saving To...')
            .files(output.path ? output.path : output);
    }
};


module.exports = function(potion) {
    // Make Potion available throughout this file.
    Potion = potion;

    return Task;
};
