var gulp        =   require('gulp');
var sass        =   require('gulp-sass');
var pug         =   require('gulp-concat');
var typescript  =   require('gulp-typescript');
var concat      =   require('gulp-concat');

var tsProject   =   typescript.createProject('./typescript/tsconfig.json');

gulp.task('sass-compile', () => {

    return gulp.src(['*.sass','sass/**/*.sass'])
            .pipe(sass().on('error', error => {

                console.log('Error on sass compilation:' + error);

            }))
            .pipe(concat('core.css'))
            .pipe(gulp.dest('./../src/ext/css'));
            
    
});

gulp.task('pug-compile', () => {

    return gulp.src(['*.pug', 'sass/**/*.sass'])
            .pipe(pug().on('error', error => {

                console.log('Error on pug compilation: ' + error);

            }))
            .pipe(concat('index.html'))
            .pipe(gulp.dest('./../src'));

});

gulp.task('typescript-compile', () => {

    return gulp.src(['*.ts', 'typescript/**/*.ts'])
            .pipe(tsProject().on('error', error => {

                console.log('Error on typescript compilation: ' + error);

            }))
            .pipe(gulp.dest('./../src/ext/js'))

});

gulp.task('monitor', () => {

    gulp.watch(['*.sass', 'sass/**/*.sass'],    gulp.series('sass-compile'));
    gulp.watch(['*.pug', 'pug/**/*.pug'],       gulp.series('pug-compile'));
    gulp.watch(['*.pug', 'typescript/**/*.ts'], gulp.series('typescript-compile'));

});

gulp.task('default', gulp.series('monitor'));