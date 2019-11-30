const { dest } = require("gulp");
const gulpif = require("gulp-if");
const babel = require("gulp-babel");
const getBabelConfig = require("../config/babel.config");

function isJavaScriptFile(file) {
    return /m?jsx?$/.test(file.extname);
}

module.exports = function(stream, options) {
    return stream
        .pipe(gulpif(isJavaScriptFile, babel(getBabelConfig(options.babel))))
        .on("error", function(err) {
            console.log(err.message);
            this.emit("end");
        });
};
