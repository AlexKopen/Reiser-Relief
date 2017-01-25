var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var ts = require('gulp-typescript');
var hash = require('gulp-hash');
var merge = require('merge-stream');

var sourcePaths = {
	scripts: './src/js/*.ts',
	stylesheets: './src/css/*.less',
	phpScripts: './src/php/*.php',
	iconResources: './src/icons/**/*',
	imageResources: './src/images/**/*'
};

var destinationPaths = {
	scripts: './dist/resources/js',
	stylesheets: './dist/resources/css',
	phpScripts: './dist',
	iconResources: './dist/resources/icons',
	imageResources: './dist/resources/images'
};

gulp.task('typescript', function() {
	return gulp.src(sourcePaths.scripts)
        .pipe(ts({
            noImplicitAny: true,
            out: 'all.min.js'
        }))
		.pipe(uglify())
		.pipe(hash())
        .pipe(gulp.dest(destinationPaths.scripts))
		.pipe(hash.manifest('assets.json'))
    	.pipe(gulp.dest('./dist'));
});

gulp.task('less', function() {
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
    	.pipe(gulp.dest('./dist'));		
});

gulp.task('php', function() {
	return gulp.src(sourcePaths.phpScripts)
		.pipe(gulp.dest(destinationPaths.phpScripts));
});

gulp.task('resourceDirectories', function() {
	var icons = gulp.src(sourcePaths.iconResources)
		.pipe(gulp.dest(destinationPaths.iconResources));

	var images = gulp.src(sourcePaths.imageResources)
		.pipe(gulp.dest(destinationPaths.imageResources));

	return merge(icons, images);		
});

gulp.task('watch', function() {
	gulp.watch(sourcePaths.scripts, ['typescript']);
	gulp.watch(sourcePaths.stylesheets, ['less']);
	gulp.watch(sourcePaths.phpScripts, ['php']);
});

gulp.task('default', ['watch', 'typescript', 'less', 'php', 'resourceDirectories']);
