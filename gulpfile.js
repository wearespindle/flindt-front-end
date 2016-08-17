'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    jsIndex: './assets/js/index.js',
    browser: './',
    img: './assets/images',
    fonts: './assets/fonts',
    sassIndex: './assets/stylesheets/scss/styles.scss',
    sass: './assets/stylesheets/**/*.scss',
    js: './assets/js/**/*.js',
    html: './**/*.html',
};


/**
 * Generate the JavaScript bundled file. All source target files are wrapped in
 * a closure by Browserify.
 */
gulp.task('js', function () {
    return browserify(paths.jsIndex, {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./compiled-assets/'))
        .pipe(browserSync.reload({stream: true}));
});


/**
 * Setup local server for static files.
 */
gulp.task('browser-sync', function () {
    const config = {
        server: {baseDir: paths.browser}
    };

    return browserSync(config);
});


/**
 * Generate a compiled CSS file from the scss files. Add sourcemaps & autoprefix
 * files for the last two browser versions.
 */
gulp.task('sass', function () {
  return gulp.src(paths.sassIndex)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./compiled-assets/css'))
    .pipe(browserSync.reload({stream: true}));
});


/**
 * Watch sourcefiles and execute tasks upon changing the files, after that
 * refresh the browser.
 */
gulp.task('watch', function () {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.html, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}))
    });
});


/**
 * Process all images. Currently they are only copied to the compiled-assets
 * directory. Later we can add some other tasks here.
 */
gulp.task('images', function() {
        return gulp.src(path.join(paths.img, '**'))
        .pipe(gulp.dest('./compiled-assets/images'))
        .pipe(browserSync.reload({stream: true}));
});


/**
 * Process all fonts.
 */
gulp.task('fonts', function() {
        return gulp.src(path.join(paths.fonts, '**'))
        .pipe(gulp.dest('./compiled-assets/fonts'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['js', 'sass', 'watch', 'images', 'fonts', 'browser-sync']);
