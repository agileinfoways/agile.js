module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'<%= pkg.name %>.min.js': ['agile.js']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'agile.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true,
					strict: true
				},
				strict: true
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'uglify']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default', ['jshint', 'uglify', 'watch']);
};