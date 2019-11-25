const { dest } = require("gulp");
const gulpif = require("gulp-if");
const ts = require("gulp-typescript");

function isTypeScriptFile(file) {
    return file.extname === ".ts" || file.extname === ".tsx";
}

module.exports = function compiler(stream, options) {
    return stream.pipe(gulpif(isTypeScriptFile, ts()));
    // .pipe(gulpif(isTypeScriptFile, dest(options.outDir)));
};
