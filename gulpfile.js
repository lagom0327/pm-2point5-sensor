var gulp = require('gulp');
var webp = require('gulp-webp');
// var fontSpider = require( 'gulp-font-spider' );

gulp.task('webp', () => (
  gulp.src('./*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('./build/image'))
));

// gulp.task('fontspider', function() {
// 	return gulp.src('./index.html')
// 		.pipe(fontSpider());
// });


gulp.task('default',gulp.series('wep'));