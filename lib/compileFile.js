const gulp = require("gulp");

const compile = require("./compile");

module.exports = function(paths, options) {
    return compile(
        gulp.src(paths, {
            cwd: options.appSrc,
            allowEmpty: true
        }),
        options
    );
};
