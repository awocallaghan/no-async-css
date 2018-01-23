'use strict';

/**
 * Automated build tasks for 'awocallaghan.github.io' Jekyll site
 * - Adapted and extended from Clean Blog's Gruntfile.js
 * @author Alex O'Callaghan
 *
 * Tasks:
 * ==
 * gulp build = build everything
 * gulp build:js = build JS
 * gulp build:css = build CSS
 *
 * gulp js = transpile JS
 * gulp js:projects = use babel to transpile js/projects.js
 * gulp js:maths-problems = use browserify to transpile js/maths-problems/app.js
 *
 * gulp uglify = minify JS
 * gulp uglify:main = minify js/clean-blog.js
 * gulp uglify:projects  = minify js/projects.dist.js
 * gulp uglify:maths-problems = minify js/maths-problems/app.dist.js
 *
 * gulp css = build CSS
 * gulp css:main = build main LESS less/clean-blog.less
 *
 * gulp concat = concatenate files
 * gulp concat:js = join all vendor + global scripts into js/common.min.js
 * gulp concat:css = join all vendor + global styles into css/style.min.css
 */

// Load Gulp and required plugins
const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const browserify = require('browserify');
const babelify = require('babelify');
const vueify = require('vueify');
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const pump = require('pump');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const path = require('path');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const batch = require('gulp-batch');

// Load JSON config
const config = require('./Gulp.config.json');

// Global build tasks
gulp.task('build', ['js', 'uglify', /*'css',*/ 'concat']);
gulp.task('build:js', ['concat:js','uglify']);
gulp.task('build:js:main', ['concat:js']);
gulp.task('build:js:projects', ['uglify:projects']);
gulp.task('build:js:maths-problems', ['uglify:maths-problems']);
//gulp.task('build:css', ['concat:css']);

// Build JavaScript files
// - Generate 'js/projects.dist.js' from 'js/projects.js'
// - Use Babel to transpile ES2015
gulp.task('js:projects', function () {
  return gulp.src('js/site/projects.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    pipe(rename('projects.dist.js'))
    .pipe(gulp.dest('./js/site'));
});
// - Generate 'js/maths-problems/app.dist.js'
// - Use Browserify + Vueify
gulp.task('js:maths-problems', function () {
  let b = browserify({
    entries: './js/maths-problems/src/app.js',
    debug: true,
    transform: [babelify, vueify]
  });
  return b.bundle()
    .pipe(source('./js/maths-problems/src/app.js'))
    .pipe(buffer())
    .pipe(rename('maths-problems.dist.js'))
    .pipe(gulp.dest('./js/maths-problems/dist'));
});
// - All JS tasks
gulp.task('js', ['js:projects', 'js:maths-problems'], function () {
  console.log('JavaScript tasks complete');
});

// Uglify JavaScript tasks
// - Generic task function uglify from 'src' to 'dest'
function uglifyTask (src, rn, dest) {
  return function (cb) {
    pump([
      gulp.src(src),
      uglify(),
      rename(rn),
      gulp.dest(dest || './js')
    ], cb);
  };
}
// - Uglify general website JS
gulp.task('uglify:main', uglifyTask('js/site/clean-blog.js', 'clean-blog.min.js', './js/site'));
// - Uglify rel=preload poly
gulp.task('uglify:cssrelpreload', uglifyTask('_includes/js/cssrelpreload.js', 'cssrelpreload.min.js', './_includes/js'));
// - Uglify projects page JS
gulp.task('uglify:projects', ['js:projects'], uglifyTask('js/site/projects.dist.js', 'projects.min.js'));
// - Uglify maths-problems Vue app
gulp.task('uglify:maths-problems', ['js:maths-problems'], uglifyTask('js/maths-problems/dist/maths-problems.dist.js', 'maths-problems.min.js'));
// - Uglify everything
gulp.task('uglify', ['uglify:main','uglify:cssrelpreload','uglify:projects','uglify:maths-problems'], function () {
  console.log('Uglify tasks complete');
});

/*
// Build CSS files
// - Compile LESS styles
gulp.task('css:main', function () {
  return gulp.src('./less/clean-blog.less')
    // less/clean-blog.less => css/clean-blog.css
    .pipe(less({
      paths: ['./less']
    }))
    // also minify => css/clean-blog.min.css
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename('clean-blog.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css/site'));
});
// - All CSS tasks
gulp.task('css', ['css:main'], function () {
  console.log('CSS tasks complete');
});*/

// Concatenate files
// - Generic concatenation task function
function concatTask (src, rn, dest) {
  return function () {
    // Concatenate src files => dest
    return gulp.src(src)
      .pipe(concat(rn))
      .pipe(gulp.dest(dest));
  };
}
// - Concatenate minified CSS files into single 'css/style.min.css'
//gulp.task('concat:css', ['css:main'], concatTask(['css/vendor/bootstrap.min.css','css/vendor/tether.min.css','css/site/clean-blog.min.css','css/vendor/syntax.min.css','css/vendor/font-awesome.min.css','css/site/fonts.css'], 'style.min.css', './css'));
// - Concatenate minified JS files into single 'js/common.min.js'
gulp.task(
  'concat:js', 
  ['uglify'], 
  concatTask(config["concat:js"].files, config["concat:js"].rn, './js')
);
// - Concat everything
gulp.task('concat', [/*'concat:css',*/ 'concat:js'], function () {
  console.log('Concatenation tasks complete');
});

// Watch files
// - Watch everything
gulp.task('watch', ['watch:js',/*'watch:css'*/]);
// - Watch JS
gulp.task('watch:js', function () {
  watch(['js/site/clean-blog.js','js/site/projects.js','js/maths-problems/src/*'], batch(function (events, done) {
    gulp.start('build:js', done);
  }));
});
// - Watch JS: projects.js
gulp.task('watch:js:projects', function () {
  watch('js/site/projects.js', batch(function (events, done) {
    gulp.start('build:js:projects', done);
  }));
});
// - Watch JS: maths-problems/app.js
gulp.task('watch:js:maths-problems', function () {
  watch('js/maths-problems/src/*', batch(function (events, done) {
    gulp.start('build:js:maths-problems', done);
  }));
});
/*
// - Watch CSS
gulp.task('watch:css', function () {
  watch('less/*.less', batch(function (events, done) {
    gulp.start('build:css', done);
  }));
});*/
