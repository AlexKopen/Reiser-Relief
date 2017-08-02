var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var hash = require('gulp-hash');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');

var sourcePaths = {
  admin: 'admin/**/*',
  dist: 'dist',
  framework: 'src/php/silex/vendor/**/*',
  htaccess: '.htaccess',
  images: 'src/images/**/*',
  index: 'src/php/index.php',
  scripts: 'src/js/**/*',
  stylesheets: 'src/css/**/*',
  templates: 'src/templates/**/*'
};

var destinationPaths = {
  admin: 'dist/admin',
  assets: 'dist',
  framework: 'dist/vendor',
  htaccess: 'dist',
  imagesDestination: 'dist/resources/images',
  index: 'dist',
  indexFile: 'dist/index.php',
  masterScript: 'dist/resources/js/all.min-*.js',
  masterStylesheet: 'dist/resources/css/style-*.css',
  scripts: 'dist/resources/js',
  stylesheets: 'dist/resources/css',
  templatesDestination: 'dist/resources/templates'
};

gulp.task('javascript', ['deleteMasterScript'], function () {
  return gulp.src(sourcePaths.scripts)
    .pipe(uglify().on('error', function (err) {
      console.log(err);
      this.emit('end');
    }))
    .pipe(concat('all.min.js'))
    .pipe(hash())
    .pipe(gulp.dest(destinationPaths.scripts))
    .pipe(hash.manifest('assets.json'))
    .pipe(gulp.dest(destinationPaths.assets));
});

gulp.task('less', ['deleteMasterStylesheet'], function () {
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

gulp.task('deleteIndex', function () {
  return gulp.src(destinationPaths.indexFile)
    .pipe(clean({force: true}));
});

gulp.task('index', ['deleteIndex'], function () {
  return gulp.src(sourcePaths.index)
    .pipe(gulp.dest(destinationPaths.index));
});

gulp.task('deleteTemplates', function () {
  return gulp.src(destinationPaths.templatesDestination)
    .pipe(clean({force: true}));
});

gulp.task('templates', ['deleteTemplates'], function () {
  return gulp.src(sourcePaths.templates)
    .pipe(gulp.dest(destinationPaths.templatesDestination));
});

gulp.task('deleteImages', function () {
  return gulp.src(destinationPaths.imagesDestination)
    .pipe(clean({force: true}));
});

gulp.task('images', ['deleteImages'], function () {
  return gulp.src(sourcePaths.images)
    .pipe(gulp.dest(destinationPaths.imagesDestination));
});

gulp.task('copyResources', function () {
  var admin = gulp.src(sourcePaths.admin)
    .pipe(gulp.dest(destinationPaths.admin));

  var framework = gulp.src(sourcePaths.framework)
    .pipe(gulp.dest(destinationPaths.framework));

  var htaccess = gulp.src(sourcePaths.htaccess)
    .pipe(gulp.dest(destinationPaths.htaccess));

  return merge(framework, htaccess);
});

gulp.task('deleteMasterScript', function () {
  return gulp.src(destinationPaths.masterScript)
    .pipe(clean({force: true}));
});

gulp.task('deleteMasterStylesheet', function () {
  return gulp.src(destinationPaths.masterStylesheet)
    .pipe(clean({force: true}));
});

gulp.task('watchFiles', ['images', 'index', 'javascript', 'less', 'templates'], function () {
  gulp.watch(sourcePaths.images, {cwd: './'}, ['images']);
  gulp.watch(sourcePaths.index, {cwd: './'}, ['index']);
  gulp.watch(sourcePaths.scripts, {cwd: './'}, ['javascript']);
  gulp.watch(sourcePaths.stylesheets, {cwd: './'}, ['less']);
  gulp.watch(sourcePaths.templates, {cwd: './'}, ['templates']);
});

gulp.task('deleteDist', function () {
  return gulp.src(sourcePaths.dist)
    .pipe(clean({force: true}));
});

gulp.task('default', ['deleteDist'], function () {
  gulp.start('watchFiles', 'copyResources');
});
