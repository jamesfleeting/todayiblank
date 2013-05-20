(function() {
  'use strict';

  module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
        options: {
          separator: ';',
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        dist: {
          files: {
            'public/js/plugins.js': ['components/jquery/jquery.js']
          }
        }
      },
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          //sourceMap: 'public/js/source-map.js.map'
        },
        dist: {
          files: {
            'public/js/plugins.min.js': ['public/js/plugins.js'],
            'public/js/app.min.js': ['public/js/app.js']
          }
        }
      },
      jshint: {
        files: ['gruntfile.js'],
        // configure JSHint (documented at http://www.jshint.com/docs/)
        options: {
          globals: {
            jQuery: true,
            console: true,
            module: true
          }
        }
      },
      less: {
        development: {
          files: {
            'public/css/style.css': 'public/css/style.less'
          }
        },
        production: {
          options: {
            yuicompress: true
          },
          files: {
            'public/css/style.min.css': 'public/css/style.less'
          }
        }
      },
      watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'concat', 'uglify']
      }
    });

    // Load libs
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Register the default tasks
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less']);
  };
}());