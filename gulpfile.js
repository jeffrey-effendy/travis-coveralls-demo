var gulp = require('gulp');

// auto watcher
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

// testing
var karma = require('karma');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var codecov = require('gulp-codecov');
var open = require('gulp-open');

gulp.task('watch', function() {
  livereload.listen();
  nodemon({
    script: 'index.js',
    ext: 'js'
  }).on('restart', function() {
    gulp.src('index.js')
      .pipe(livereload())
      .pipe(notify('Changes detected, page reloads ...'));
  });
});

gulp.task('frontend-test', function(done) {
  return new karma.Server({
    configFile: __dirname + '/test/karma.conf.js',
    action: 'run',
    singleRun: true
  }, done).start();
});

gulp.task('open-frontend-coverage', ['frontend-test'], function() {
  return gulp.src('./test/coverage/jasmine/lcov/lcov-report/index.html')
    .pipe(open({ app: 'chrome' }));
});

gulp.task('prepare-istanbul-reporter', function() {
  return gulp.src(['server/*.js', 'server/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('backend-test', ['prepare-istanbul-reporter'], function() {
  return gulp.src(['test/backend/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports({ 
      reportOpts: {
        lcov: { dir: './test/coverage/mocha/lcov', file: 'lcov.info' }
      }
    })); 
});

gulp.task('open-backend-coverage', ['backend-test'], function() {
  return gulp.src('./test/coverage/mocha/lcov/lcov-report/index.html')
    .pipe(open({ app: 'chrome' }));
});

gulp.task('test:local', ['open-frontend-coverage', 'open-backend-coverage'], function() {
  
})

gulp.task('test:ci', ['frontend-test', 'backend-test'], function() {
  return gulp.src(['./test/coverage/mocha/lcov/lcov.info', './test/coverage/jasmine/lcov/lcov.info'])
    .pipe(codecov());
});

gulp.task('default', function() {
});