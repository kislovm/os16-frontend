var gulp = require('gulp'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('templates', function() {
    gulp.src('./jade/*.jade')
        .pipe(jade({
            client: true
        }))
        .pipe(gulp.dest('./client-templates'));

    gulp.src('./jade/*.jade')
        .pipe(jade({
        }))
        .pipe(gulp.dest('./html-templates'));
});

gulp.task('dev', function() {
    gulp.run('templates');

    gulp.src(['./an.js', './jst.js', './client-templates/*.js'])
        .pipe(concat('index.js')) // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
        .pipe(gulp.dest('./js')); // даем команду на перезагрузку страницы
});

gulp.task('prod', function() {
    gulp.run('templates');

    gulp.src(['./an.js', './jst.js', './client-templates/*.js'])
        .pipe(concat('index.js')) // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
        .pipe(uglify())
        .pipe(gulp.dest('./js')); // даем команду на перезагрузку страницы
});

gulp.task('default', function() {
    gulp.watch(['./an.js', './jst.js', './jade/*.jade'], ['dev']);
});
