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
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
				}
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
				tasks: ['concat', 'uglify' /*,'copy'*/ ],
				options: {
					spawn: false,
				},
			},
			sass: {
				files: ['<%= pkg.styleSrcDir %>/**/*.scss'],
				tasks: ['sass:dist', 'autoprefixer', 'cssmin']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'*.html',
					'<%= pkg.styleDestDir %>/**/*.css',
					'<%= pkg.jsDestDir %>/**/*.js',
				]
			}
		},
		modernizr: {
			dist: {
				"devFile": "js/lib/modernizr.min.js",
				"outputFile": "js/lib/modernizr-custom.js",
				extra: {
					'shiv': true,
					'printshiv': true,
					'load': true,
					'mq': false,
					'cssclasses': true
				},
				extensibility: {
					'prefixed': true
				},
				uglify: true,
				tests: [
					'svg', 'backgroundsize', 'fontface', 'touch', 'input', 'csstransforms', 'csstransforms3d', 'rgba'
				],
				parseFiles: true,
				matchCommunityTests: false
			}
		}
	});

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks("grunt-modernizr");

	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer', 'modernizr', 'cssmin', 'connect', 'watch']);
};