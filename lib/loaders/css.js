const { dest } = require("gulp");
const gulpif = require("gulp-if");
const sass = require("gulp-sass");
const less = require("gulp-less");
const postcss = require("gulp-postcss");

function isCssFile(file) {
    return file.extname === ".css" || isScssFile(file) || isLessFile(file);
}
function isScssFile(file) {
    return file.extname === ".scss";
}
function isLessFile(file) {
    return file.extname === ".less";
}

module.exports = function(stream, options) {
    return stream
        .pipe(gulpif(isScssFile, sass().on("error", sass.logError)))
        .pipe(gulpif(isLessFile, less()))
        .pipe(
            gulpif(
                isCssFile,
                postcss([
                    require("postcss-flexbugs-fixes"),
                    require("postcss-preset-env")({
                        autoprefixer: {
                            flexbox: "no-2009"
                        },
                        stage: 3
                    })
                ])
            )
        );
    // .pipe(gulpif(isLessFile, dest(options.outDir)));
};
