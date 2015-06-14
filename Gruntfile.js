/* global module: false, require: false, __dirname: false, process: false */

// Database connect
var argv = require('optimist').argv;
var port = argv.port || 9999;

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        '<%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        watch: {
            less: {
                files: [ 'app/src/styles/**/*.less' ],
                tasks: [ 'less' ]
            },
            js: {
                files: [ 'app/src/scripts/**/*.js' ],
                tasks: [ 'browserify' ]
            }
        },

        clean: {
            deploy: [ 'release/src' ]
        },

        browserify: {
            options: {
                debug: true,
                transform: [['reactify', {es6: true}]],
                extensions: ['.jsx']
            },
            dist: {
                src: ['app/src/scripts/main.js'],
                dest: 'app/public/scripts/scripts.js',
                options: {
                    debug: true,
                    transform: [['reactify', {es6: true}]],
                    extensions: ['.jsx'],
                    require: ['react']
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: 'app/src/styles',
                    cleancss: true
                },
                files: {
                    'app/public/styles/styles.css': 'app/src/styles/styles.less'
                }
            }
        },

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/src/images',
                        src: ['**'],
                        dest: 'app/public/images/'
                    },
                    {
                        src: 'app/public/packages/modernizr/modernizr.js',
                        dest: 'app/public/scripts/modernizr.js'
                    },
                    {
                        expand: true,
                        cwd: 'app/src/fonts',
                        src: ['**'],
                        dest: 'app/public/fonts'
                    }
                ]
            },
            deploy: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['**'],
                        dest: 'release'
                    }
                ]
            }
        },

        concurrent: {
            prod: {
                tasks: [
                    'copy:build',
                    'browserify',
                    'less',
                    'proxy:prod',
                    'watch'
                ],
                options: {
                    logConcurrentOutput: true
                }
            },
            dev: {
                tasks: [
                    'copy:build',
                    'browserify',
                    'less',
                    'proxy:dev',
                    'watch'
                ],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    // Load npm tasks.
    grunt.util._.each([
        'contrib-clean',
        'contrib-copy',
        'contrib-watch',
        'concurrent',
        'contrib-less',
        'gh-pages',
        'browserify'
    ], function (tasks) {
        grunt.loadNpmTasks('grunt-' + tasks);
    });

    grunt.registerTask('proxy', function () {
        var done = this.async();
        var app = require('./utils/proxy')({
            server: this.args[0],
            port: port
        });
        app.on('close', done);
    });

    grunt.registerTask('default', ['concurrent:dev']);
    grunt.registerTask('deploy', ['copy:build', 'browserify', 'less', 'copy:deploy', 'clean:deploy']);

};
