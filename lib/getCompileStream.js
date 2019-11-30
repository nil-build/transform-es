const gulp = require("gulp");

module.exports = function(files, options) {
    return gulp.src(files, {
        cwd: options.appSrc,
        allowEmpty: true
    });
};
