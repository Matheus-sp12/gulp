const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemim = require('gulp-imagemin');

function comprimeImg() {
    return gulp.src('./source/images/*')
    .pipe(imagemim())
    .pipe(gulp.dest('./build/images'))
}

function comprimeJs() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'))
}

function compilSass() {
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}

exports.sass = compilSass;
exports.watch = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilSass));
};
exports.javaScript = comprimeJs;
exports.images = comprimeImg;