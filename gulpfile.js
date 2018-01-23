var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var del = require('del');
var notify = require("gulp-notify");
var concat = require('gulp-concat');

var moduleBgFix = require('./moduleBgFix');

var processors = [
	// moduleBgFix(),
	autoprefixer({browsers: ['last 2 version']})
];

const ignorePug = [
	'!src/layouts/**',
	'!src/blocks/**',
	'!src/globals/**'
];

gulp.task('html', function(){
	return gulp.src(['src/**/*.pug', ...ignorePug])
		.pipe(pug()).on('error', notify.onError())
		.pipe(gulp.dest('build'))
});

gulp.task('js', function(){
	return gulp.src('src/assets/*.js')
		.pipe(gulp.dest('build/assets'))
});

gulp.task('css', function(){
	return gulp.src('src/assets/*.styl')
		.pipe(stylus()).on('error', notify.onError())
		.pipe(postcss(processors))
		.pipe(gulp.dest('build/assets'))
		.pipe(browserSync.stream())
});

gulp.task('vendor-js', function() {
	return gulp.src('src/vendor/**/*.js')
	.pipe(concat('vendor.js'))
	.pipe(gulp.dest('build/assets'))
});

gulp.task('vendor-css', function() {
	return gulp.src('src/vendor/**/*.css')
	.pipe(concat('vendor.css'))
	.pipe(gulp.dest('build/assets'))
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

var reload = function(done){
	browserSync.reload();
	done();
}

gulp.task('watch', function() {
	gulp.watch('src/**/*.pug', gulp.series('html', reload));
	gulp.watch('src/**/*.styl', gulp.series('css'));
	gulp.watch('src/**/*.js', gulp.series('js', reload));
});

gulp.task('copy', function(){
	return gulp.src([
			'src/assets/**/*.{jpg,png,jpeg,svg,gif}'
		])
	.pipe(gulp.dest('build/assets'))
});

gulp.task('clean', function() {
	return del('build');
});

gulp.task('build', gulp.parallel('html', 'css', 'js', 'vendor-css', 'vendor-js', 'copy'));
gulp.task('start', gulp.parallel('watch', 'serve'));

gulp.task('default', gulp.series('clean', 'build', 'start'));






