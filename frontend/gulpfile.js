var gulp        =   require('gulp');
var sass        =   require('gulp-sass');
var pug         =   require('gulp-concat');
var typescript  =   require('gulp-typescript');
var concat      =   require('gulp-concat');
var browserSync =   require('browser-sync').create();

var tsProject   =   typescript.createProject('./typescript/tsconfig.json');

gulp.task('sass-compile', () => {

    return gulp.src(['*.sass','sass/**/*.sass'])
            .pipe(sass().on('error', error => {

                console.log('Error on sass compilation:' + error);

            }))
            .pipe(concat('core.css'))
            .pipe(gulp.dest('./../dist/ext/css'));
            
    
});

gulp.task('local-pug-compile', () => {

    return gulp.src(['*.pug','./pug/**/*.pug'])
            .pipe(pug().on('error', error => {
                console.log('Error on pug compilation: ' + error);
            }))
            .pipe(gulp.dest('./../dist/'));

});

gulp.task('typescript-compile', () => {

    return gulp.src(['*.ts', 'typescript/**/*.ts'])
            .pipe(tsProject().on('error', error => {

                console.log('Error on typescript compilation: ' + error);

            }))
            .pipe(gulp.dest('./../dist/ext/js'));

});

gulp.task('monitor', () => {

    gulp.watch(['*.sass',   './sass/**/*.sass'],        gulp.series('sass-compile'));
    gulp.watch(['*.pug',    './pug/**/*.pug'],          gulp.series('local-pug-compile'));
    gulp.watch(['*.ts',     './typescript/**/*.ts'],    gulp.series('typescript-compile'));
    // gulp.watch('./../dist/**/*.html', browserSync.reload);
    // browserSync.init({

    //     server: {
    //         baseDir: './../dist'
    //     }

    // });
    
});

gulp.task('default', gulp.series('monitor'));