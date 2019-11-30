const gulp = require("gulp");
const babelLoader = require("./loaders/babel");
const tsLoader = require("./loaders/typescript");
const cssLoader = require("./loaders/css");

module.exports = function compile(stream, options) {
    // stream.on("error", function(error) {
    //     console.log(error);
    // });

    stream = babelLoader(stream, options);
    stream = cssLoader(stream, options);
    stream = tsLoader(stream, options);

    stream = stream.pipe(gulp.dest(options.outDir));

    return stream;
};
