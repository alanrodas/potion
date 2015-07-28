var p = require('path');
var gutils = require('gulp-util');


/*
 |----------------------------------------------------------------
 | Master Configuration
 |----------------------------------------------------------------
 |
 | This file contains the proper paths and options for each and
 | and every Gulp task that Potion wraps up. To override any
 | setting, reference Potion.config.* from your Gulpfile.
 |
 | Alternatively you may create an Potion.json file within your
 | project root. As JSON, modify any settings contained here
 | and they'll take precedence over these defaults. Easy!
 |
 */

var config = {

    /*
     |----------------------------------------------------------------
     | Tasks
     |----------------------------------------------------------------
     |
     | The tasks array stores all tasks that should be executed each
     | time you trigger Gulp from the command line. Generally you
     | won't need to modify this but it's an option if needed.
     |
     */

    tasks: [],

    /*
     |----------------------------------------------------------------
     | Production Mode
     |----------------------------------------------------------------
     |
     | Potion will trigger certain actions, dependent upon this flag.
     | You may "turn on" this mode by triggering "gulp --production".
     | This will enable such things, like CSS and JS minification.
     |
     */

    production: !! gutils.env.production,

    /*
     |----------------------------------------------------------------
     | Assets Path
     |----------------------------------------------------------------
     |
     | This assets path property is prefixed to all relevant assets
     | in your application. For example, "resources/assets/sass"
     | or "resources/assets/coffee." Change this if you must.
     |
     */

    assetsPath: 'app/Assets/',

    /*
     |----------------------------------------------------------------
     | Views Path
     |----------------------------------------------------------------
     |
     | This public path property is prefixed to any paths in your
     | application, that point to the views dir.
     | It's useful, when a server requires a unique view path.
     |
     */

    viewsPath: 'app/View',

    /*
     |----------------------------------------------------------------
     | Public Path
     |----------------------------------------------------------------
     |
     | Much like assets path, this public path property is prefixed to
     | any paths in your application, that point to the public dir.
     | It's useful, when a server requires a unique public path.
     |
     */

    publicPath: 'app/webroot',

    /*
     |----------------------------------------------------------------
     | App Path
     |----------------------------------------------------------------
     |
     | The app path, you guessed it, specifies the path to the app
     | folder in your project. If using Laravel, then you won't
     | need to modify this path. Otherwise modify as needed.
     |
     */

    appPath: 'app',

    /*
     |----------------------------------------------------------------
     | Sourcemaps
     |----------------------------------------------------------------
     |
     | A sourcemap is a JSON mapping, which declares a relationship
     | between a minified file and its original source location.
     | Quite useful for debugging, it's turned on by default.
     |
     */

    sourcemaps: true,

    css: {

        /*
         |----------------------------------------------------------------
         | CSS Source Folder
         |----------------------------------------------------------------
         |
         | This property declares the root folder for all vanilla CSS
         | files. Note that this is the folder name, not the path.
         | We'll stick with a general "css" name - makes sense.
         |
         */

        folder: 'css',

        /*
         |----------------------------------------------------------------
         | CSS Output Folder
         |----------------------------------------------------------------
         |
         | Generally, your source files will be stored outside of your
         | public directory, and then compiled/merged as necessary.
         | This property represents the public specific folder.
         |
         */

        outputFolder: 'css',

        /*
         |----------------------------------------------------------------
         | CSS3 Autoprefixing
         |----------------------------------------------------------------
         |
         | When working with any form of CSS, Potion automatically runs
         | your file through a CSS autoprefixer, which automatically
         | adds or removes vendor-specific CSS3 prefixes. Useful!
         |
         */

        autoprefix: {
            enabled: true,

            // https://www.npmjs.com/package/gulp-autoprefixer#api
            options:  {
                browsers: ['last 2 versions'],
                cascade: false
            }
        },

        /*
         |----------------------------------------------------------------
         | Sass Compilation
         |----------------------------------------------------------------
         |
         | Gone are the days of researching how to call Sass on a given
         | folder. Simply run `mix.sass('file.scss')` and you're all
         | set. This object sets the folder name and plugin opts.
         |
         */

        sass: {
            folder: 'sass',

            // https://github.com/sass/node-sass#options
            pluginOptions: {
                outputStyle: gutils.env.production
                    ? 'compressed'
                    : 'nested'
            }
        },

        /*
         |----------------------------------------------------------------
         | Less Compilation
         |----------------------------------------------------------------
         |
         | Gone are the days of researching how to call Less on a given
         | folder. Simply run `mix.less('file.less')` and you're all
         | set. This object sets the folder name and plugin opts.
         |
         */

        less: {
            folder: 'less',

            // https://github.com/plus3network/gulp-less#options
            pluginOptions: {}
        }
    },

    js: {

        /*
         |----------------------------------------------------------------
         | JavaScript Source Folder
         |----------------------------------------------------------------
         |
         | Much like the CSS folder option above, this property sets the
         | name of the folder, not the full path, for your JavaScript
         | source files. It then gets affixed to the "assetsPath".
         |
         */

        folder: 'js',

        /*
         |----------------------------------------------------------------
         | JavaScript Output Folder
         |----------------------------------------------------------------
         |
         | Once your vanilla JavaScript files have been compiled/merged,
         | they will be saved to your public directory. This property
         | represents the name of the folder within that location.
         |
         */

        outputFolder: 'js',

        /*
         |----------------------------------------------------------------
         | Babel Compilation
         |----------------------------------------------------------------
         |
         | Think of Babel as a compiler for next-generation JavaScript.
         | If you'd like to make use of ES6 - or even ES7 features -
         | in new apps, we make it a cinch right from the get go.
         |
         */

        babel: {
            // https://www.npmjs.com/package/gulp-babel#babel-options
            options: {
                stage: 2,
                compact: false
            }
        },

        /*
         |----------------------------------------------------------------
         | Browserify Compilation
         |----------------------------------------------------------------
         |
         | Browserify allows you to pull in Node modules in the browser!
         | Generally a pain to get up and running, Potion offers many
         | sensible defaults to get you up to speed super quickly.
         |
         */

        browserify: {
            // https://www.npmjs.com/package/browserify#usage
            options: {},

            transformers: [
                {
                    name: 'babelify',

                    // https://www.npmjs.com/package/gulp-babel#babel-options
                    options: {
                        stage: 2,
                        compact: false
                    }
                },

                {
                    name: 'partialify',

                    // https://www.npmjs.com/package/partialify
                    options: {}
                }
            ],

            watchify: {
                enabled: false,

                // https://www.npmjs.com/package/watchify#usage
                options: {}
            }
        },

        /*
         |----------------------------------------------------------------
         | CoffeeScript Compilation
         |----------------------------------------------------------------
         |
         | If you prefer CoffeeScript compilation, this object stores
         | the defaults for the Coffee folder name - not the path.
         | When used, this value will be affixed to assetsPath.
         |
         */

        coffee: {
            folder: 'coffee',

            // https://github.com/wearefractal/gulp-coffee#options
            options: {}
        },

        /*
         |----------------------------------------------------------------
         | Coffeeify Compilation
         |----------------------------------------------------------------
         |
         | Coffeeify allows you to pull in Node modules in the browser
         | with CoffeeScript! Generally a pain to get up and running,
         | Potion offers many sensible defaults to get you up to speed
         | super quickly.
         |
         */

        coffeeify: {
            folder: 'coffee',

            options: {}
        }
    },

    testing: {

        /*
         |----------------------------------------------------------------
         | PHPUnit Autotesting
         |----------------------------------------------------------------
         |
         | Want to automatically trigger your PHPUnit tests. Not a prob!
         | This object stores the defaults for the path to your tests
         | folder, as well as any "gulp-phpunit" specific options.
         |
         */

        phpUnit: {
            path: 'tests',

            // https://www.npmjs.com/package/gulp-phpunit#api
            options: {
                debug: true,
                notify: true
            }
        },


        /*
         |----------------------------------------------------------------
         | PHPSpec Autotesting
         |----------------------------------------------------------------
         |
         | Want to automatically trigger your PHPSpec tests. Not a prob!
         | This object stores the defaults for the path to your specs
         | folder, as well as any "gulp-phpspec" specific options.
         |
         */

        phpSpec: {
            path: 'spec',

            // https://www.npmjs.com/package/gulp-phpspec#api
            options: {
                verbose: 'v',
                notify: true
            }
        }
    },

    /*
     |----------------------------------------------------------------
     | File Versioning
     |----------------------------------------------------------------
     |
     | If you use aggressive assets caching on your server, then you
     | will need a way to cachebust, right? No querystring needed
     | this time. Here you may set the default "build" folder.
     |
     */

    versioning: {
        buildFolder: 'build'
    }

};


/**
 * Fetch a config item, using a string dot-notation.
 *
 * @param  {string} path
 * @return {string}
 */
config.get = function(path) {
    var basePath;
    var current = config;

    var segments = path.split('.');

    // If the path begins with "assets" or "public," then
    // we can assume that the user wants to prefix the
    // given base url to their config path. Useful!

    if (segments[0] == 'assets' || segments[0] == 'public') {
        basePath = config[segments.shift()+'Path'];
    }

    segments.forEach(function(segment) {
        current = current[segment];
    });

    return p.join(basePath, current);
};


module.exports = config;
