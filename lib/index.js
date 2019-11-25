const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const glob = require("glob");
const gulp = require("gulp");

const { isFile } = require("./utils");
const defaultOptions = require("./defaultOptions");
const isFunction = require("lodash/isFunction");
const defaultsDeep = require("lodash/defaultsDeep");
const compile = require("./compile");
const compileDir = require("./compileDir");
const watcher = require("./watcher");
const log = require("./logger");

const babelLoader = require("./loaders/babel");
const tsLoader = require("./loaders/typescript");
const cssLoader = require("./loaders/css");
const sassLoader = require("./loaders/sass");
const lessLoader = require("./loaders/less");
const postcssLoader = require("./loaders/postcss");

const bannerPlugin = require("./plugins/banner");

const success = chalk.keyword("green");

module.exports = async function(appSrc = "src", appDest = "lib", options = {}) {
    const configFile = options.configFile;
    let configFileOptions = {};

    if (configFile && fs.existsSync(path.resolve(process.cwd(), configFile))) {
        configFileOptions = require(path.resolve(process.cwd(), configFile));
        if (isFunction(configFileOptions)) {
            configFileOptions = configFileOptions(options, options.state);
        }

        delete options.configFile;
    }

    options = defaultsDeep({}, configFileOptions, options);

    options = defaultOptions(options);

    const loaders = [];

    if (options.resolveLoaders) {
        options.loaders = options.resolveLoaders(loaders);
    }

    console.log(
        glob.sync("**/*.ts", {
            cwd: path.resolve(options.cwd, appSrc)
        }).length,
        " files"
    );

    // options.plugins = [bannerPlugin];

    appSrc = appSrc || ".";
    appDest = appDest || "lib";
    //是否显示Log
    log.showLog = options.log;

    options.outDir = path.resolve(options.cwd, appDest);

    let stream = gulp.src(["**/*", "**/*.*", "**/.*"], {
        // 解析 globs 的根路径.
        cwd: path.resolve(options.cwd, appSrc)
    });
    stream = babelLoader(stream, options.babelOptions);
    stream = cssLoader(stream, {});
    stream = tsLoader(stream, {});

    stream.pipe(gulp.dest(options.outDir));
};
