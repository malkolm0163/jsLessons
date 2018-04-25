var gulp = require('gulp'),
    args = require('yargs').argv,
    bs = require('browser-sync').create();


var lastLesson = args.lesson || 10;
lastLesson = './Theme' + lastLesson;

gulp.task('watch', function () {
    bs.init({
        server: {
            baseDir: lastLesson
        }
    });
    gulp.watch(lastLesson + '/*.css', ['css']);
    gulp.watch(lastLesson + '/*.js', ['js']);
    gulp.watch(lastLesson + '/*.html').on('change', bs.reload)
});
gulp.task('css', function () {
    gulp.src(lastLesson + '/*.css')
        .pipe(bs.stream());
});
gulp.task('js', function () {
    gulp.src(lastLesson + '/*.js')
        .pipe(bs.stream());
});
gulp.task('default', ['watch']);