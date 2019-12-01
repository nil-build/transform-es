const gulpif = require("gulp-if");
const babel = require("gulp-babel");
const { handleError } = require("../utils");
const getBabelConfig = require("../config/babel.config");

function isTypeScriptFile(file) {
    if (/\.d\.ts$/.test(file.basename)) {
        return false;
    }
    return /\.tsx?$/.test(file.basename);
}

function isJavaScriptFile(file) {
    return /m?jsx?$/.test(file.extname) || isTypeScriptFile(file);
}

module.exports = function(stream, options) {
    return stream
        .pipe(gulpif(isJavaScriptFile, babel(getBabelConfig(options.babel))))
        .on("error", handleError);
};
