const gulp = require("gulp");
const path = require("path");
const fs = require("fs-extra");
const { isDir } = require("./utils");
const babelLoader = require("./loaders/babel");
const tsLoader = require("./loaders/typescript");
const cssLoader = require("./loaders/css");

module.exports = async function compile(file, options) {
    const absPath = path.resolve(options.appSrc, file);
    if (isDir(absPath)) {
        await fs.ensureDir(absPath);
    }

    return new Promise(resolve => {
        let stream = gulp.src(file, {
            cwd: options.appSrc,
            allowEmpty: true
        });

        stream = babelLoader(stream, options);
        stream = cssLoader(stream, options);
        stream = tsLoader(stream, options);

        stream = stream.pipe(gulp.dest(options.outDir));

        stream.on("finish", () => {
            resolve(file);
        });
        stream.on("error", () => {
            resolve(file);
        });
    });
};
