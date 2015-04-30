module.exports = function(grunt) {

	grunt.config.init({
		pkg: grunt.file.readJSON('package.JSON'),
		concat: {
			option: {
				banner: '/*! JS concat <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT")%> */\n',
				separator: ';'
			},
			basic: {
				src: '<%= pkg.jsSrcDir %>/src/all-site/*.js',
				dest: '<%= pkg.jsDestDir %>/src/all-site.js'
			}
		},
		uglify: {
			dynamic_mappings: {
				files: [{
					expand: true,
					cwd: '<%= pkg.jsDestDir %>/src/',
					src: ['*.js'],
					dest: '<%= pkg.jsDestDir %>/lib/',
					ext: '.min.js',
					extDot: 'last'
				}, ],
			},
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', '> 1%', 'ie 7', 'ie 8', 'ie 9']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= pkg.styleDestDir %>',
					src: '*.css',
					dest: '<%= pkg.styleDestDir %>'
				}]
			}
		},
		cssmin: {
			my_target: {
				files: [{
					expand: true,
					cwd: '<%= pkg.styleDestDir %>',
					src: ['*.css', '!*.min.css'],
					dest: '<%= pkg.styleDestDir %>',
					ext: '.min.css'
				}]
			}
		},
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= pkg.styleSrcDir %>',
					src: '**/*.scss',
					dest: '<%= pkg.styleDestDir %>',
					ext: '.css'
				}]
			}
		},
		watch: {
			scripts: {
				files: ['<%= pkg.jsSrcDir %>/src/all-site/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				},
			},
			sass: {
				files: ['<%= pkg.styleSrcDir %>/**/*.scss'],
				tasks: ['sass:dist', 'autoprefixer', 'cssmin']
			}
		},
		/*modernizr: {

			dist: {
				//"devFile" : "js/src/modernizr.js",
				"devFile" : "test/modernizr.js",

				//"outputFile" : "js/src/modernizr-custom.js",
				"outputFile" : "test/modernizr-custom.js",

				"extra" : {
					"shiv" : true,
					"printshiv" : true,
					"load" : true,
					"mq" : true,
					"cssclasses" : true
				},

				// Based on default settings on http://modernizr.com/download/
				"extensibility" : {
					"addtest" : false,
					"prefixed" : false,
					"teststyles" : false,
					"testprops" : false,
					"testallprops" : false,
					"hasevents" : false,
					"prefixes" : false,
					"domprefixes" : false,
					"cssclassprefix": ""
				},

				// By default, source is uglified before saving
				"uglify" : false,

				// Define any tests you want to implicitly include.
				"tests" : [],

				"parseFiles" : false,

				"matchCommunityTests" : false,

				"customTests" : []
			}
		}*/
});

grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-modernizr');

grunt.registerTask('default', [/*'modernizr',*/'concat','uglify','sass','autoprefixer','cssmin','watch']);
};