const gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    runSequence = require('run-sequence'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    path = {
        sources: {
            styles: 'app/styles/main.scss',
            templates: 'app/*.html',
            scripts: 'app/js/**/*.js',
            images: 'app/images/**/*',
            fonts: 'app/fonts/*'
        },
        watch: {
            styles: 'app/styles/**/*.scss',
            templates: 'app/**/*.html',
            scripts: 'app/js/*.js',
            images: 'app/images/**/*',
            fonts: 'app/fonts/*'
        },
        dist: {
            styles: 'dist/css',
            templates: 'dist',
            scripts: 'dist/js',
            images: 'dist/images',
            fonts: 'dist/fonts'
        }
    };

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        host: 'localhost',
        port: '3003'
    })
});

gulp.task('clean:dist', function () {
    return del.sync('dist');
});

gulp.task('build:sass', function () {
    return gulp.src(path.sources.styles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(path.dist.styles))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:js', function () {
    return gulp.src(path.sources.scripts)
        .pipe(rigger())
        .pipe(gulp.dest(path.dist.scripts))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('build:html', function () {
   return gulp.src(path.sources.templates)
       .pipe(rigger())
       .pipe(gulp.dest(path.dist.templates))
       .pipe(browserSync.reload({
           stream: true
       }));
});

gulp.task('build:img', function () {
   return gulp.src(path.sources.images)
       .pipe(imagemin())
       .pipe(gulp.dest(path.dist.images))
       .pipe(browserSync.reload({
           stream: true
       }))
});

gulp.task('build:fonts', function () {
    return gulp.src(path.sources.fonts)
        .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('build:dev', ['build:html', 'build:sass', 'build:js', 'build:img', 'build:fonts']);

gulp.task('watch', ['browserSync', 'build:dev'], function () {
   gulp.watch(path.watch.styles, ['build:sass']);
   gulp.watch(path.watch.templates, ['build:html']);
   gulp.watch(path.watch.scripts, ['build:js']);
   gulp.watch(path.watch.images, ['build:img']);
});

gulp.task('default', function () {
    runSequence('clean:dist', 'watch');
});