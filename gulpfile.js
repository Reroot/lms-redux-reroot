"use strict";//to use es6


//for things  of common js, node engine and browserr v8 enginnen , make code universals
//When using the CommonJS pattern, bundling JavaScript files isn’t as simple as concatenating them. Rather, you have an entry point
// (usually called index.js or app.js) with a series of require or import statements at the top of the file:
//***last phase of testing is cross browser testing****
//import, gulp concatotns js files and bundels then to js.min


var gulp = require('gulp');//our 
var connect = require('gulp-connect');//create a local server
var open = require('gulp-open');
var browserify = require('browserify');//it makes it complitble for browser
var babelify = require("babelify");//complie js and jsx Babel is a JavaScript compiler
//Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or
var source = require('vinyl-source-stream');//put in a centralied source
var concat = require('gulp-concat');
var lint = require('gulp-eslint');

var config = {//config based on enivronments, some everonments dont need certain imports, base don server, loocal, test enivronment
	port: 8080,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',//define where everything is, to avoid movement as speficifty, transpilation, compression, need to be found
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    	],
		dist: './dist',//target source
		mainJs: './src/main.js'
	}
}

//Start a local development server
gulp.task('connect', function() {//callback, method in side gulp we imported to connect
	connect.server({//define server parameters, need a root,port,base url,live reload
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

//define server running, point one task within another task. 
//telling the open task, you are creating an array of dependency, as you would need to run one with the other
gulp.task('open', ['connect'], function() {//adding functional programming to a funciton
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));//pipeing is a producer of data - consumer of data pattern - one process is going to feed another
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());//
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(babelify, {presets: ["es2015", "react", "stage-3"]})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + "/images"))
		.pipe(connect.reload());
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint())
		.pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);