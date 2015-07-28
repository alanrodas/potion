var gulp = require('gulp');
var Potion = require('../../index');

var notify = new Potion.Notification;


module.exports = function(options) {
    new Potion.Task(options.name, function() {
        this.log(options.src);

        return (
            gulp
            .src(options.src)
            .pipe(options.plugin('', options.pluginOptions))
            .on('error', function(e) {
                notify.forFailedTests(e, options.name);

                this.emit('end');
            })
            .pipe(notify.forPassedTests(options.name))
        );
    })
    .watch(options.src, 'tdd')
    .watch(Potion.config.appPath + '/**/*.php', 'tdd');
};
