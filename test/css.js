const gulp = require("gulp");
const css = require("../lib/loaders/css");

const stream = gulp.src("./test/src/css/**/*.*");

css(stream, {
    outDir: "./test/dest/css"
});
