module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				mangle: false
			},
			dist: {
				files: {
					'agile.min.js': ['agile.js']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'agile.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					console: true,
					module: true,
					document: true
				},				
			}
		},
		jscs: {
			src: "agile.js",
			options: {
				config: ".jscsrc"
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'jscs', 'uglify']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-jscs");
	
	// grunt.registerTask('default', ['jshint', 'jscs', 'uglify', 'watch']);
	grunt.registerTask('default', ['jshint', 'jscs', 'watch']);
};