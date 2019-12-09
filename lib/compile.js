const gulp = require("gulp");
const path = require("path");
const fs = require("fs-extra");
const { isDir } = require("./utils");
const babelLoader = require("./loaders/babel");
const eslintLoader = require("./loaders/eslint");
const tsLoader = require("./loaders/typescript");
const cssLoader = require("./loaders/css");

module.exports = async function compile(file, options) {
    const absPath = path.resolve(options.appSrc, file);
    const outFile = path.resolve(options.outDir, file);
    let outDir = options.outDir;

    if (isDir(absPath)) {
        await fs.ensureDir(outFile);
        return Promise.resolve(file);
    }

    outDir = path.dirname(outFile);

    return new Promise(resolve => {
        let stream = gulp.src(absPath, {
            cwd: options.appSrc,
            allowEmpty: true
        });

        stream = eslintLoader(stream, options);
        stream = cssLoader(stream, options);
        stream = tsLoader(stream, options);
        stream = babelLoader(stream, options);

        stream = stream.pipe(gulp.dest(outDir));

        stream.on("finish", () => {
            resolve(file);
        });
        stream.on("error", () => {
            resolve(file);
        });
    });
};
