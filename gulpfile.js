//// PLUG-INS

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');


//// HTML

// copy index.html into dist
gulp.task('copy-html', copyHTML());

// watch for changes to html and automatically copy into dist
gulp.task('checking-html', function() {
    gulp.watch('dev/index.html', copyHTML())
});

// copy HTML
function copyHTML() {
    return function() {
        return gulp.src('dev/index.html')
        .pipe(gulp.dest('./dist'));
    }
}

//// IMAGES

// Image compression guidelines:
    // hamburger menu: lossy or SVG
    // hero image: lossless
    // image thumbnails: lossy

// copy images into dist
gulp.task('copy-imgs', copyIMGs());

// copy images
function copyIMGs() {
    return function() {
        return gulp.src('dev/imgs/**/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/imgs'));
    }
}

//// STYLES

// copy css into dist/css
gulp.task('copy-styles', copyStyles());

// watch for changes to css and automatically copy into dist/css
gulp.task('checking-styles', function () {
    gulp.watch('dev/sass/**/*.scss', copyStyles())
});

// copy styles
function copyStyles() {
    return function() {
        return gulp.src('dev/sass/**/*.scss') // explicitly signal async completion by returning a stream
            .pipe(sass(
                // ({outputStyle: 'compressed'})
            ).on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
                //cascade: false
            }))
            .pipe(gulp.dest('dist/css'));
    }
}

// copy fonts into dist/fonts
gulp.task('copy-fonts', function() {
    return gulp.src('dev/fonts/**')
        .pipe(gulp.dest('dist/fonts'));
});


//// JS

// transpile and generate sourcemapped js file into dist/js
gulp.task('copy-scripts', copyScripts());

// continue to transpile and generate sourcemapped js file into dist/js as changes are made
gulp.task('checking-scripts', function() {
    gulp.watch('dev/js/**/*.js', copyScripts())
});

// copy, transpile and concat js files
function copyScripts() {
    return function() {
        return gulp.src('dev/js/**/*.js')
        .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
    }
}


//// JASMINE

// copy Jasmine files
gulp.task('copy-jasmine', function() {
    return gulp.src('dev/jasmine/**')
        .pipe(gulp.dest('dist/jasmine'));
});

// check for changes in Jasmine spec files
gulp.task('checking-jasmine-spec', function() {
    gulp.watch('dev/jasmine/spec/**', copySpec());
});

function copySpec() {
    return function() {
        return gulp.src('dev/jasmine/spec/**')
        .pipe(gulp.dest('dist/jasmine/spec'));
    }
}

//// LINT

// lint Jasmine spec files
gulp.task('lint-jasmine-spec', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    //return gulp.src(['**/*.js', '!node_modules/**', '!jasmine/lib/**'])
    return gulp.src(['dev/jasmine/spec/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});


//// DISTRIBUTION

// copy everything to dist to make sure it matches, plus lint
gulp.task('dist', gulp.series(
    'copy-html', 
    'copy-styles', 
    'copy-fonts', 
    'copy-jasmine', 
    'copy-scripts'
));


//// DEFAULT

// continuely watch for changes to anything, including html, scss and js, fonts, jasmine
gulp.task('default', gulp.parallel(
    'checking-styles', 
    'checking-html',
    'checking-fonts', 
    'checking-scripts',
    'checking-jasmine-spec', 
    function(done) {
        done();
}));