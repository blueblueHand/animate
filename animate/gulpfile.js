'usestrict'
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');
var connect = require('connect');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var image = require('gulp-imagemin');
var fileinclude = require('gulp-file-include');



var app = {
	srcPath : 'src/',
	devPath : 'build/',
	prdPath : 'dist/'
}

gulp.task('default', ['css'],function() {

});
gulp.task('lib',function(){
	gulp.src('bower_components/**/*')
   		.pipe(gulp.dest(app.devPath+'/lib'))
   		.pipe(gulp.dest(app.prdPath+'/lib'))
   		.pipe($.connect.reload());
})
gulp.task('css',function(){
	console.log('css')
	gulp.src(app.srcPath + 'sass/*.scss')
		.pipe(sass().on('error', sass.logError))
   		.pipe(gulp.dest(app.devPath+'/css'))
   		.pipe(cssmin())
   		.pipe(gulp.dest(app.prdPath+'/css'))
   		.pipe($.connect.reload());
})
gulp.task('js',function(){
	console.log('js')
	gulp.src(app.srcPath + 'js/*.js')
   		.pipe(gulp.dest(app.devPath+'/js'))
   		.pipe(gulp.dest(app.prdPath+'/js'))
   		.pipe($.connect.reload());
})
gulp.task('html',['fileinclude'],function(){
	gulp.src(app.srcPath + 'tpl/**/*.html')
   		.pipe(gulp.dest(app.devPath+'/tpl'))
   		.pipe(gulp.dest(app.prdPath+'/tpl'))
   		.pipe($.connect.reload());
})
gulp.task('image',function(){
	gulp.src(app.srcPath + 'img/**/*')
		.pipe(image())
   		.pipe(gulp.dest(app.devPath+'/img'))
   		.pipe(gulp.dest(app.prdPath+'/img'))
   		.pipe($.connect.reload());
})
gulp.task('fileinclude', function(done) {
    gulp.src(['src/app/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(app.devPath+'/tpl'))
   		.pipe(gulp.dest(app.prdPath+'/tpl'))
    	.pipe($.connect.reload());
});
gulp.task('serve',['css','js','html','lib','image'],function(){
	$.connect.server({
		root : [app.devPath],
		livereload : true,
		port: 1234
	})
	open("http://localhost:1234/tpl/index.html");

	gulp.watch(app.srcPath+'sass/**/*.scss',['css'])
	gulp.watch(app.srcPath+'tpl/**/*.html',['html'])
	gulp.watch(app.srcPath+'js/**/*.js',['js'])
})