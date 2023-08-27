// // import gulp from 'gulp';
// import gulp from './gulp';
// import sass from 'gulp-sass';
// import cssnano from 'gulp-cssnano';
// import rev from 'gulp-rev';
// import { default as uglify } from 'gulp-uglify-es';
// // import imagemin from 'gulp-imagemin';
// import del from 'del';

// gulp.task('css', function(done){
//     console.log('minifying css...');
//     // gulp.src('./asserts/sass/**/*.scss')
//         // .pipe(sass())
//         .pipe(cssnano())
//         .pipe(gulp.dest('./asserts.css'));

//     gulp.src('./asserts/**/*.css')
//         .pipe(rev())
//         .pipe(gulp.dest('./public/asserts'))
//         .pipe(rev.manifest({
//             cwd: 'public',
//             merge: true
//         }))
//         .pipe(gulp.dest('./public/asserts'));
//     done();
// });

// gulp.task('js', function(done){
//     console.log('minifying js...');
//     gulp.src('./asserts/**/*.js')
//         .pipe(uglify())
//         .pipe(rev())
//         .pipe(gulp.dest('./public/asserts'))
//         .pipe(rev.manifest({
//             cwd: 'public',
//             merge: true
//         }))
//         .pipe(gulp.dest('./public/asserts'));
//     done();
// });

// // gulp.task('images', function(done){
// //     console.log('compressing images...');
// //     gulp.src('./asserts/**/*.+(png|jpg|gif|svg|jpeg)')
// //         // .pipe(imagemin())
// //         .pipe(rev())
// //         .pipe(gulp.dest('./public/asserts'))
// //         .pipe(rev.manifest({
// //             cwd: 'public',
// //             merge: true
// //         }))
// //         .pipe(gulp.dest('./public/asserts'));
// //     done();
// // });

// gulp.task('clean:asserts', function(done){
//     del.sync('./public/asserts');
//     done(); 
// });

// gulp.task('build', gulp.series('clean:asserts', 'css', 'js', 'images'), function(done){
//     console.log('Building asserts');
//     done();
// });

const gulp = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./asserts/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/asserts/'))
    .pipe(rev.manifest('public/asserts/rev-manifest.json',{
        // cwd: 'public',
        base: './public/asserts',
        merge: true
    }))
    .pipe(gulp.dest('./public/asserts/'))

    done()
})

gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./asserts/css/**/*.css')
    // .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./asserts/css'));

     gulp.src('./asserts/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/asserts/'))
    .pipe(rev.manifest('public/asserts/rev-manifest.json',{
        // cwd: 'public',
        base: './public/asserts',
        merge: true
    }))
    .pipe(gulp.dest('./public/asserts/'));
    done();
});