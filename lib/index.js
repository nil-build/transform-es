const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const glob = require("glob");
const gulp = require("gulp");
const through2 = require("through2");
const logUpdate = require("log-update");

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

module.exports = async function(appSrc = "src", outDir = "lib", options = {}) {
    let files = new Set();
    let totalFile = 0;
    let pTotal = 0;
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

    let logTimer = null;
    let logMessage = 0;

    function startLog() {
        const frames = ["-", "\\", "|", "/"];
        let i = 0;
        logTimer = setInterval(function() {
            const frame = frames[(i = ++i % frames.length)];

            if (!logMessage) return;

            if (logMessage >= 100) {
                logUpdate(` Compile complete.`);
            } else {
                logUpdate(
                    `${frame} Compiling... ${pTotal}/${totalFile}(${logMessage}%)`
                );
            }
        }, 80);
    }

    function writeLog(process) {
        logMessage = process;

        if (process >= 100) {
            setTimeout(() => {
                clearInterval(logTimer);
            }, 100);
        }
    }

    logUpdate(` Start compiling...`);
    startLog();

    appSrc = appSrc || ".";
    outDir = path.resolve(options.cwd, outDir);

    const r1 = glob.sync("**/*", {
        cwd: path.resolve(options.cwd, appSrc)
    });
    const r2 = glob.sync("**/*.*", {
        cwd: path.resolve(options.cwd, appSrc)
    });
    const r3 = glob.sync("**/.*", {
        cwd: path.resolve(options.cwd, appSrc)
    });

    files = new Set([...r1, ...r2, ...r3]);

    totalFile = files.size;

    // options.plugins = [bannerPlugin];

    let stream = gulp
        .src(["**/*", "**/*.*", "**/.*"], {
            cwd: path.resolve(options.cwd, appSrc)
        })
        .pipe(
            through2.obj(function(file, _, cb) {
                pTotal++;

                const process = parseInt((pTotal * 100) / totalFile);
                writeLog(process);

                cb(null, file);
            })
        );
    stream = babelLoader(stream, options);
    stream = cssLoader(stream, options);
    stream = tsLoader(stream, options);

    stream.pipe(gulp.dest(outDir));
};
