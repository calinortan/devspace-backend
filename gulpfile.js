const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourceMaps = require('gulp-sourcemaps');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    const tsResult = tsProject.src()
        .pipe(sourceMaps. init())
        .pipe(tsProject())
        .pipe(sourceMaps.write('/', {sourceRoot:'./'}))
        .pipe(gulp.dest('dist'));
    // return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch']);