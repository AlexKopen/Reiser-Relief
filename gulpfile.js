var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var ts = require('gulp-typescript');

var sourcePaths = {
	scripts: 'src/js/*.ts',
	stylesheets: 'src/css/*.less'
};

var destinationPaths = {
	scripts: 'dist/resources/js',
	stylesheets: 'dist/resources/css'
};

// gulp.task('scripts', function() {
// 	return gulp.src(sourcePaths.scripts)
// 		.pipe(sourcemaps.init())
// 			.pipe(uglify())
// 			.pipe(concat('all.min.js'))
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest(destinationPaths.scripts));
// });

gulp.task('typescript', function() {
	return gulp.src(sourcePaths.scripts)
        .pipe(ts({
            noImplicitAny: true,
            out: 'all.min.js'
        }))
		.pipe(uglify())
        .pipe(gulp.dest(destinationPaths.scripts));
});


gulp.task('less', function() {
	return gulp.src(sourcePaths.stylesheets)
		.pipe(sourcemaps.init())
			.pipe(less().on('error', function (err) {
				console.log(err);
				this.emit('end');
			}))
			.pipe(cssmin())
			.pipe(concat('style.css'))
		.pipe(sourcemaps.write())  
		.pipe(gulp.dest(destinationPaths.stylesheets));
});

gulp.task('watch', function() {
	gulp.watch(sourcePaths.scripts, ['typescript']);
	gulp.watch(sourcePaths.stylesheets, ['less']);
});

gulp.task('default', ['watch', 'typescript', 'less']);
