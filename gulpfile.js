var gulp = require('gulp'), // load gulp
    sass = require('gulp-sass'), // load Sass package
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){ //create task 'sass'
  return gulp.src('re/sass/**/*.sass') // input files
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // modify Sass into CSS
    .pipe(gulp.dest('re/style')) // output file
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "re/"
    });
    gulp.watch("re/sass/*.sass", ['sass']);
    gulp.watch("re/*.html").on('change', browserSync.reload);
});


gulp.task('copy-html', function() {  
  gulp.src('re/*.html')
    .pipe(gulp.dest('prod'));
});

gulp.task('copy-css', function() {  
  gulp.src('re/style/*css')
    .pipe(gulp.dest('prod/style'));
});

gulp.task('copy-img', function() {  
  gulp.src('re/images/*.*')
    .pipe(gulp.dest('prod/images'));
});

gulp.task('copy', ['copy-html', 'copy-css', 'copy-img']);

gulp.task('default', ['watch']);

