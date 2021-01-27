'use strict';

const gulp = require('gulp');
const watchSass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');
// для сжатия картинок
const imagemin    = require('gulp-imagemin');
const cache    = require('gulp-cache');
const pngquant    = require('imagemin-pngquant');
// для сжатия картинок end



gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});

gulp.task('watchHtml', function () {
	return gulp.src('app/**/*.html')
		.pipe(browserSync.reload({ stream: true }))
});


watchSass.compiler = require('node-sass');
gulp.task('watchSass', function () {
	return gulp.src('app/sass/**/*.scss')
		.pipe(watchSass().on('error', watchSass.logError))
		.pipe(gulp.dest('app/css'))
// автопрефиксы
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
		.pipe(gulp.dest('app/css')) 
		.pipe(browserSync.reload({stream: true}));
// автопрефиксы end
});


gulp.task('watchJavaScript', function() {
	return gulp.src([ 'app/js/**/*.js'])
	.pipe(browserSync.reload({ stream: true }))
});

//  сжатие картинок 

gulp.task('img', function () {
	return gulp.src('app/img/**/*') 
		.pipe(cache(imagemin({ 
			
			interlaced: true,
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); 
});

//  сжатие картинок end


gulp.task('clean', async function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

	// Удалть папку dist перед сборкой


gulp.task('watch', function () {

	gulp.watch('app/**/*.html', gulp.parallel('watchHtml')); 
	gulp.watch('app/sass/**/*.scss', gulp.parallel('watchSass')); 
	gulp.watch('app/**/*.js', gulp.parallel('watchJavaScript')); 

});

gulp.task('default', gulp.parallel( 'browserSync','watch'));

// для начала работы пиши gulp 




gulp.task('build', gulp.parallel( 'clean','img','watchSass', async function () {

	gulp.src('app/pages/**/*.html').pipe(gulp.dest('dist/pages'));
	gulp.src('app/css/**/*.css').pipe(gulp.dest('dist/css'));
	gulp.src('app/js/**/*.js').pipe(gulp.dest('dist/js'));
	gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

}));

// отправить проект в dist + сжать фото.  gulp build