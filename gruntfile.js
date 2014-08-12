module.exports = function(grunt) {

grunt.config.init({
	pkg: grunt.file.readJSON('package.JSON'),
	concat: {
		option: {
			banner:'/*! JS concat <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT")%> */\n',
			separator: ';'
		},
		basic: {
			src: '<%= pkg.jsSrcDir %>/src/all-site/*.js',
			dest: '<%= pkg.jsDestDir %>/src/all-site.js'
		}
	},
	uglify: {
		dynamic_mappings: {
			files: [
				{
					expand: true
					,cwd: '<%= pkg.jsDestDir %>/src/'
					,src: ['*.js']
					,dest: '<%= pkg.jsDestDir %>/lib/'
					,ext: '.min.js'
					,extDot: 'last'
				},
			],
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
	sass: {
		dist: {
			options: {
				style: 'compressed'
			},
			files: [{
				expand: true,
				cwd: '<%= pkg.styleSrcDir %>',
				src: ['*.scss'],
				dest: '<%= pkg.styleDestDir %>',
				ext: '.min.css'
			}]
		}
	},
	watch: {
		scripts: {
			files: ['<%= pkg.jsSrcDir %>/src/all-site/*.js'],
			tasks: ['concat','uglify'/*,'copy'*/],
			options: {
				spawn: false,
			},
		},
		sass:{
			files: ['<%= pkg.styleSrcDir %>/*.scss'],
			tasks: ['sass:dist','autoprefixer'/*,'copy'*/]
		}
	},
	modernizr: {
		dist: {
			"devFile" : "js/lib/modernizr.min.js",
			"outputFile" : "js/lib/modernizr-custom.js",
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
				'svg'
				,'backgroundsize'
				,'fontface'
				,'touch'
				,'input'
			],
			parseFiles: true,
			matchCommunityTests: false
		}
	},
	copy:{//usefuly for building a static server for testing respond js when using a CDN
		main: {
			files:[
				{
					src: ['<%= pkg.styleDestDir %>/*','<%= pkg.images %>/*','<%= pkg.jsDestDir %>/*','<%= pkg.jsDestDir %>/lib/*']
					,dest: '<%= pkg.staticDevServerLocation %>'
				}
			]
		}
	},
	pagespeed: {
		options: {
		nokey: true,
		url: 'http://1a8abceb.ngrok.com/require.html'
		},
		prod: {
			options: {
				locale: "en_GB",
				strategy: "desktop",
				threshold: 80
			}
		},
		mobile: {
			options: {
				locale: "en_GB",
				strategy: "mobile",
				threshold: 80
			}
		},
	}
});

grunt.loadNpmTasks('grunt-pagespeed')
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks("grunt-modernizr");

grunt.registerTask('default', ['concat','uglify','sass','autoprefixer','modernizr'/*,'copy'*/,'watch']);
};