var gulp = require('gulp'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    watchify = require('watchify'),
    browserify = require('browserify');


var bundler = watchify(browserify('./an.js', watchify.args));
// add any other browserify options or transforms here
bundler.transform(require('browserify-jade').jade({
    pretty: false
}));

gulp.task('js', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you dont want sourcemaps
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      .pipe(sourcemaps.write('./')) // writes .map file
    //
    .pipe(gulp.dest('./dist'));
}


gulp.task('templates', function() {

    gulp.src('./jade/*.jade')
        .pipe(jade({
        }))
        .pipe(gulp.dest('./html-templates'));
});


gulp.task('dev', function() {
    gulp.run('templates');

    gulp.src(['./dist/bundle.js', './jst.js'])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./js'))
});

gulp.task('prod', function() {
    gulp.run('templates');

    gulp.src(['./an.js', './jst.js'])
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('default', function() {
    gulp.watch(['./an.js', './jst.js', './jade/*.jade'], ['js', 'dev']);
});
