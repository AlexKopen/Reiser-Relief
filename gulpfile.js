var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var hash = require('gulp-hash');
var merge = require('merge-stream');
var clean = require('gulp-clean');

var sourcePaths = {
	dist: 'dist',
	scripts: 'src/js/*.js',
	stylesheets: 'src/css/*.less',
	phpScripts: 'src/php/*.php',
	templates: 'src/templates/*.twig',
	iconResources: 'src/icons/**/*',
	imageResources: 'src/images/**/*',
	framework: 'src/php/silex/vendor/**/*',
	htaccess: '.htaccess'
};

var destinationPaths = {
	scripts: 'dist/resources/js',
	masterScript: 'dist/resources/js/all.min-*.js',
	stylesheets: 'dist/resources/css',
	masterStylesheet: 'dist/resources/css/style-*.css',
	phpScripts: 'dist',
	templates: 'dist/resources/templates',
	iconResources: 'dist/resources/icons',
	imageResources: 'dist/resources/images',
	assets: 'dist',
	framework: 'dist/vendor',
	htaccess: 'dist'
};

gulp.task('javascript', function() {
	return gulp.src(sourcePaths.scripts)
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(hash())
		.pipe(gulp.dest(destinationPaths.scripts))
		.pipe(hash.manifest('assets.json'))
		.pipe(gulp.dest(destinationPaths.assets));
});

gulp.task('less', ['deleteMasterStylesheet'], function() {
	return gulp.src(sourcePaths.stylesheets)
		.pipe(less().on('error', function (err) {
			console.log(err);
			this.emit('end');
		}))
		.pipe(cssmin())
		.pipe(concat('style.css'))
		.pipe(hash())
		.pipe(gulp.dest(destinationPaths.stylesheets))
		.pipe(hash.manifest('assets.json'))
		.pipe(gulp.dest(destinationPaths.assets));		
});

gulp.task('php', function() {
	return gulp.src(sourcePaths.phpScripts)
		.pipe(gulp.dest(destinationPaths.phpScripts));
});

gulp.task('template', function() {
	return gulp.src(sourcePaths.templates)
		.pipe(gulp.dest(destinationPaths.templates));
});

gulp.task('copyDirectories', function() {
	var icons = gulp.src(sourcePaths.iconResources)
		.pipe(gulp.dest(destinationPaths.iconResources));

	var images = gulp.src(sourcePaths.imageResources)
		.pipe(gulp.dest(destinationPaths.imageResources));

	var framework = gulp.src(sourcePaths.framework)
		.pipe(gulp.dest(destinationPaths.framework));

	var htaccess = gulp.src(sourcePaths.htaccess)
		.pipe(gulp.dest(destinationPaths.htaccess));

	return merge(icons, images, framework, htaccess);		
});

gulp.task('deleteDist', function() {
	return gulp.src(sourcePaths.dist)
		.pipe(clean({force: true}));
});

gulp.task('deleteMasterScript', function() {
	return gulp.src(destinationPaths.masterScript)
		.pipe(clean({force: true}));
});

gulp.task('deleteMasterStylesheet', function() {
	return gulp.src(destinationPaths.masterStylesheet)
		.pipe(clean({force: true}));
});

gulp.task('watch', function() {
	gulp.watch(sourcePaths.scripts, {cwd: './'}, ['javascript']);
	gulp.watch(sourcePaths.stylesheets, {cwd: './'}, ['less']);
	gulp.watch(sourcePaths.phpScripts, {cwd: './'}, ['php']);
	gulp.watch(sourcePaths.templates, {cwd: './'}, ['template']);
});

gulp.task('default', ['watch', 'javascript', 'less', 'php', 'template', 'copyDirectories']);
