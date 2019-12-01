const gulpif = require("gulp-if");
const PluginError = require("plugin-error");
const sass = require("gulp-sass");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const log = require("../logger");
const { handleError } = require("../utils");

function isScssFile(file) {
    return file.extname === ".scss";
}
function isLessFile(file) {
    return file.extname === ".less";
}

function isCssFile(file) {
    return file.extname === ".css" || isScssFile(file) || isLessFile(file);
}

function handleSassError(error) {
    const message = new PluginError("sass", error.messageFormatted).toString();
    log.save(`Scss:\n${message}\n`);
}

module.exports = function(stream, options) {
    const postcssConfig = require("../config/postcss.config");
    const config = postcssConfig(options.postcss);

    return stream
        .pipe(gulpif(isScssFile, sass().on("error", handleSassError)))
        .on("error", function() {
            this.emit("end");
            //ignore error
        })
        .pipe(gulpif(isLessFile, less()))
        .on("error", function(err) {
            handleError.call(this, err, "Less");
        })
        .pipe(gulpif(isCssFile, postcss(config.plugins)))
        .on("error", function(err) {
            handleError.call(this, err, "PostCSS");
        });
};
