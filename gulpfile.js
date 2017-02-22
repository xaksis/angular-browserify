var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var paths = {
    partials: './app/**/*.html',
    style: './app/sass/style.scss',
    bootstrap: './app/vendor/bootstrap-sass/bootstrap.scss',
    images: './app/assets/imgs/**/*'
};

gulp.task('connect', function(){
    plugins.connect.server({
        root: 'public',
        port: 4001
    });
});

gulp.task('style', function(){
    return gulp.src([paths.style])
        .pipe(plugins.sass({
            includePaths: [paths.style]
        }).on('error', plugins.sass.logError))
        .pipe(plugins.concat('styles.css'))
        .pipe(plugins.cleanCss())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('images', function(){
    return gulp.src(paths.images)
        .pipe(plugins.image())
        .pipe(gulp.dest('./public/images'));
});

/*  for now just copying over the partials
******************************************/
gulp.task('partials', function(){
    return gulp.src(paths.partials)
            .pipe(gulp.dest('./public/'));
});

gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify('./app/app.js')
        // bundles it and creates a file called main.js
        .bundle().on('error', function(err){
            console.log(err.toString());
            this.emit("end");
        })
        .pipe(source('bundle.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['browserify']);
    gulp.watch('app/**/*.html', ['partials']);
    gulp.watch('app/**/*.scss', ['style']);
    gulp.watch('app/**/*.png', ['images']);
});

gulp.task('default', ['partials', 'browserify', 'style', 'images', 'watch']);