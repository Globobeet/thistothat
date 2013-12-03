module.exports = function(grunt) {
    var jsPath = 'lib/js',
        minPath = 'lib/min',
        vendorPath = jsPath + '/vendor',
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

        jshint: {
            source: [modelPath + '/*.js', jsPath + '/application.js'],
            afterconcat: [minPath + '/application.min.js']
        },

        concat: {
            libraries: {
                src: [vendorPath + '/modernizr/modernizr-2.6.3.js', vendorPath + '/lodash/lodash-2.2.1.js', vendorPath + '/jquery/jquery-2.0.3.js', vendorPath + '/jquery.hammer/jquery.hammer-1.0.5.js'],
                dest: minPath + '/libraries.min.js'
            },
            application: {
                src: [modelPath + '/Converter.js', modelPath + '/CategoryMenu.js', modelPath + '/ConversionWindow.js', modelPath + '/Calculator.js', modelPath + '/App.js', jsPath + '/application.js'],
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

        watch: {
            scripts: {
                files: [modelPath + '/*.js', vendorPath + '/*.js', jsPath + '/application.js'],
                tasks: ['compile-js']
            },
            css: {
                files: ['lib/sass/*.js'],
                tasks: ['compile-css'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('compile-css', ['compass']);
    grunt.registerTask('compile-js', ['jshint:source', 'concat', 'jshint:afterconcat']);
    grunt.registerTask('compile', ['compile-css', 'compile-js']);
    grunt.registerTask('compile-prod', ['compile', 'uglify']);
    grunt.registerTask('default', ['watch']);
};