var gulp  = require('gulp');
// Build Plugins
var runSequence = require('run-sequence');
var del = require('del');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');
var ejsmin = require('gulp-ejsmin');
var imagemin = require('gulp-imagemin');
var autoprefix = require('gulp-autoprefixer');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
// Development Plugins
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var gulpRemoveHtml = require('gulp-remove-html');

gulp.task('jshint', function () {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('build-ejs-index', function () {
    return gulp.src('src/views/index.ejs')
        .pipe(gulpRemoveHtml())
        .pipe(ejsmin({removeComment: true}))
        .pipe(ejsmin())
        .pipe(gulp.dest('dist/views'))
});

gulp.task('build-ejs',function(){
    return gulp.src('src/views/**/*.ejs')
        .pipe(ejsmin({removeComment: true}))
        .pipe(gulp.dest('dist/views'))
        .pipe(livereload());
});

gulp.task('imagemin', function () {
    return gulp.src('src/images/**/*')
        .pipe(imagemin({
            progressive:true
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe(livereload());
});

gulp.task('build-styles',function () {
    return gulp.src('src/styles/**/*.less')
        .pipe(less())
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(livereload());
});

gulp.task('styles-dep', function () {
    return gulp.src('src/lib/**/*.css')
        .pipe(concat('bundle.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/styles/'))
});

gulp.task('build-scripts-dep',function () {
    return gulp.src(['src/lib/angular.js','src/lib/**/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(livereload());
});

gulp.task('build-scripts', function () {
    return gulp.src(['src/scripts/app.js','src/scripts/**/*.js'])
        .pipe(concat('script.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(livereload());
});

gulp.task('bower', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('src/lib'));
});

gulp.task('clean-dist', function () {
    return del('dist/**/*');
});
gulp.task('clean-lib', function () {
    return del('src/lib/**/*');
});
gulp.task('build', function(callback) {
    runSequence('build-ejs','build-ejs-index','imagemin','build-styles','styles-dep','build-scripts','build-scripts-dep', callback);
});

gulp.task('default',['build-ejs','imagemin','build-styles','styles-dep','build-scripts'], function () {
    livereload.listen();

    gulp.watch('src/views/**/*.ejs',['build-ejs']);
    gulp.watch('src/images/**/*',['imagemin']);
    gulp.watch('src/styles/**/*.less',['build-styles']);
    gulp.watch('src/scripts/**/*.js',['build-scripts','jshint']);

    gulp.watch('gulpfile.js',['default']);
});
