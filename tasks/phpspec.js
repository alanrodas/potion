var Potion = require('cakephp-potion');
var runTests = require('./shared/Tests');

var config = Potion.config;


/*
 |----------------------------------------------------------------
 | PHPSpec Testing
 |----------------------------------------------------------------
 |
 | This task will trigger your entire PHPSpec test suite and it
 | will show notifications indicating the success or failure
 | of that test suite. It's works great with the tdd task.
 |
 */

Potion.extend('phpSpec', function(src, options) {
    runTests({
        name: 'phpSpec',
        src: src || (config.testing.phpSpec.path + '/**/*Spec.php'),
        plugin: Potion.plugins.phpspec,
        pluginOptions: options || config.testing.phpSpec.options
    });
});
