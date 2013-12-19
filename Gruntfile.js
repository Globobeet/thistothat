module.exports = function(grunt) {
    var jsPath = 'lib/js',
        minPath = 'lib/min',
        modelPath = jsPath + '/models';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            all: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        bower_concat: {
            all: {
                dest: minPath + '/libraries.min.js',
                dependencies: {
                    'jquery': 'modernizr',
                    'lodash': 'jquery',
                    'hammerjs': 'jquery'
                },
                exclude: 'jasmine-jquery',
                bowerOptions: {
                    relative: false
                }
            }
        },

        jshint: {
            source: [
                modelPath + '/*.js',
                jsPath + '/application.js'
            ],
            afterconcat: [
                minPath + '/application.min.js'
            ]
        },

        concat: {
            application: {
                src: [
                    jsPath + '/Helpers.js',
                    modelPath + '/Converter.js',
                    modelPath + '/CategoryMenu.js',
                    modelPath + '/ConversionWindow.js',
                    modelPath + '/Calculator.js',
                    modelPath + '/UnitPicker.js',
                    modelPath + '/App.js',
                    jsPath + '/application.js'
                ],
                dest: minPath + '/application.min.js'
            }
        },

        uglify: {
            libraries: {
                files: {
                    'lib/min/libraries.min.js': [minPath + '/libraries.min.js']
                }
            },
            application: {
                files: {
                    'lib/min/application.min.js': [minPath + '/application.min.js']
                }
            }
        },

        jasmine: {
            src : modelPath + '/**/*.js',
            options: {
                specs : 'tests/*_test.js',
                vendor: [
                    minPath + '/libraries.min.js',
                    'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
                    'lib/conversions.js'
                ],
                helpers : [
                    jsPath + '/Helpers.js'
                ]
            }
        },

        watch: {
            libraries: {
                files: ['bower_components/**/*'],
                tasks: ['compile-libs']
            },
            scripts: {
                files: [jsPath + '/**/*.js'],
                tasks: ['test-js', 'compile-js']
            },
            tests: {
                files: [
                    'tests/**/*_test.js',
                    'tests/fixtures/*.html'
                ],
                tasks: ['test-js']
            },
            css: {
                files: ['lib/sass/*.scss'],
                tasks: ['compile-css']
            }
        },

        githooks: {
            all: {
                'pre-commit': 'compile-prod'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-githooks');

    grunt.registerTask('compile-css', ['compass']);
    grunt.registerTask('compile-libs', ['bower_concat']);
    grunt.registerTask('compile-js', ['jshint:source', 'concat', 'jshint:afterconcat']);
    grunt.registerTask('compile', ['compile-css', 'compile-libs', 'compile-js']);
    grunt.registerTask('test-js', ['jasmine']);
    grunt.registerTask('compile-prod', ['test-js', 'compile', 'uglify']);
    grunt.registerTask('default', ['compile', 'watch']);
};