var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    fileinclude = require('gulp-file-include'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    minifyHTML = require('gulp-minify-html');

var outputDir, sassStyle, env;

// use [gulp --production] for output in production folder
if (argv.production) {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
  env = 'production';
} else {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
  env = 'development';
}

//Paths
var paths = {
    html_tempaltes: 'source/templates/',
    scssSource: 'source/scss/',
    imagesSource: 'source/img/',
    fontsSource: 'source/fonts/'
}

var jsSources = [
  'source/js/jquery-1.11.1.min.js',
  'source/js/jquery-color.min.js',
  'source/js/dropcap.min.js',
  'source/js/scroll.js'
]

gulp.task('js', function() {
  return gulp.src(jsSources)
    .pipe(concat('main.js'))
    .pipe(gulpif(env === 'production', uglify()))
    .on('error', function (err) {
        gutil.log('Error!', err.message);
    })
    .pipe(gulp.dest(outputDir + 'js/'))
    .pipe(connect.reload());;
});

gulp.task('htmlinclude', function() {
    return gulp.src(paths.html_tempaltes + '*.tpl.html')
    .pipe(fileinclude())
    .on('error', gutil.log)
    .pipe(rename({
      extname: ""
    }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());;
});

//Task: Sass
gulp.task('sass', function () {
    return sass(paths.scssSource, { sourcemap: true,
                                    style: sassStyle
                                  })
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulpif(env === 'development', sourcemaps.write('../maps')))
        .on('error', function (err) {
            gutil.log('Error!', err.message);
        })
        .pipe(gulp.dest(outputDir + 'css/'))
        .pipe(connect.reload());
});

gulp.task('fonts', function() {
    return gulp.src(paths.fontsSource+'**/*')
          .pipe(gulp.dest(outputDir + 'css/fonts/'));
});

gulp.task('html', function() {
    return gulp.src('source/*.html')
          .pipe(gulp.dest(outputDir))
          .pipe(connect.reload());
});

gulp.task('images', function() {
  gulp.src(paths.imagesSource + '*')
    .pipe(gulpif(env === 'production', imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    })))
    .pipe(gulp.dest(outputDir + 'images'))
    .pipe(connect.reload())
});

//Task: webserver
gulp.task('webserver', function() {
  connect.server({
    root: outputDir,
    livereload: true,
    port: 4567
  });
})

//Default task and watch expression
gulp.task('watch', function() {
    gulp.watch(paths.scssSource + '**/*.scss', ['sass']);
    //gulp.watch(paths.html_tempaltes + '**/*.html', ['htmlinclude']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('source/*.html', ['html']);
})

gulp.task('default', ['html', 'sass', 'js', 'fonts', 'images', 'webserver', 'watch']);
