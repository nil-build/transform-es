const { dest } = require("gulp");
const gulpif = require("gulp-if");
const sass = require("gulp-sass");
const less = require("gulp-less");
const postcss = require("gulp-postcss");

function isScssFile(file) {
    return file.extname === ".scss";
}
function isLessFile(file) {
    return file.extname === ".less";
}

function isCssFile(file) {
    return file.extname === ".css" || isScssFile(file) || isLessFile(file);
}

module.exports = function(stream, options) {
    const postcssConfig = require("../config/postcss.config");
    const config = postcssConfig(options.postcss);

    return stream
        .pipe(gulpif(isScssFile, sass().on("error", sass.logError)))
        .on("error", function(err) {
            console.log(err.message);
            this.emit("end");
        })
        .pipe(gulpif(isLessFile, less()))
        .on("error", function(err) {
            console.log(err.message);
            this.emit("end");
        })
        .pipe(gulpif(isCssFile, postcss(config.plugins)))
        .on("error", function(err) {
            console.log(err.message);
            this.emit("end");
        });
};
