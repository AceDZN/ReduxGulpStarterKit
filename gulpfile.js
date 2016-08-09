var gulp = require("gulp");
var gutil = require("gulp-util");
var watchify = require("watchify");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");
var server = require("gulp-server-livereload");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");

var uglify = require("gulp-uglify");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");

function notify(error){
  var message = "In: ";
  var title = "Error: ";

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split("/");
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += "\nOn Line: " + error.lineNumber;
  }

  gutil.log("title:"+title);
  gutil.log("message:"+message);
}

var bundler = watchify(
  browserify({
    ecmaFeatures: { modules: true },
    entries: ["./src/js/main.jsx"],
    transform: [
      ["babelify", {presets: ["es2015", "react"]}]
    ],
    extensions: [".jsx"],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  })
);

var sassBundler = watchify(
  browserify({
    entries: ["./src/scss/style.scss"]
  })
);

function bundle(){
  return bundler
    .bundle()
    .on("error", notify)
    .pipe(source("main.js"))
    .pipe(gulp.dest("dist/js"))
}
function sassBundle(){
  return sassBundler
  .bundle()
  .pipe(source("style.css"))
  .pipe(gulp.dest("dist/css"))
}
gulp.task("apply-prod-environment", function() {
    process.env.NODE_ENV = "production";
});
gulp.task("compress", function() {
 return gulp.src("dist/js/main.js")
   .pipe(sourcemaps.init())
   .pipe(uglify().on("error", function(){
     gutil.log("error with COMPRESSION")
   }))
   .pipe(rename({suffix:'.min'}))
   .pipe(sourcemaps.write("."))
   .pipe(gulp.dest("dist/js/"));
 });

gulp.task("sass", function(){
  gulp.src("src/scss/*.*")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("style.css"))
    .pipe(gulp.dest("src/css"))
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("src/css"));
});


bundler.on("update", function(){
  bundle()
});

sassBundler.on("update", function(){
  sassBundle();
  gulp.start("serve", function(){
    gutil.log("SASS UPDATED");
  });
});

gulp.task("build", function() {
  bundle();
  sassBundle();
});

gulp.task("copy", ["build","sass","compress"],function(){
  gulp.src("src/index.html")
    .pipe(gulp.dest("dist"));
  gulp.src("src/demo.html")
    .pipe(gulp.dest("dist"));
  gulp.src("src/files/*.*")
    .pipe(gulp.dest("dist/files"));
  gulp.src("src/css/*.*")
    .pipe(gulp.dest("dist/css"));
});


gulp.task("serve", ["copy"], function(done) {
  gulp.src("src/images/favicon.ico")
    .pipe(gulp.dest("dist/"));
  gulp.src("src/images/**/*")
    .pipe(gulp.dest("dist/images"));
  gulp.src("src/images/gallery/*.*")
    .pipe(gulp.dest("dist/images/gallery"));
  gulp.src("src/css/*.*")
    .pipe(gulp.dest("dist/css"));
  gulp.src("dist")
    .pipe(server({
      port: 9000,
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if(/main.js/.test(filePath)) {
            cb(true)
          } else if(/style.css/.test(filePath)){
            cb(true)
          } else if(/style.scss/.test(filePath)){
            cb(true)
          }
        }
      },
      open: true
    }))

});


gulp.task("default",["build","sass","compress","copy","serve"], function(){
  return gulp.watch("src/**/*.*",  batch(function (events, done) {
    gulp.start("default", done);
  }))
});
