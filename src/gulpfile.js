/* ***** Configuración Principal ***** */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

function css() {
    return gulp
        .src('./scss/componentes.scss') 
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({
            outputStyle: 'expanded', // nested, compact, compressed
        }))
        .pipe(gulp.dest('./css'));
}

function watchFiles() {
    gulp.watch('./scss/*.scss', css);
}

// ***** Registrar Funciones como Tareas ***** //
gulp.task('css', css);
gulp.task('watch', watchFiles);  