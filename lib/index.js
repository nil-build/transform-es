const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const glob = require("glob");
const gulp = require("gulp");
const plumber = require("gulp-plumber");

const through2 = require("through2");
const logUpdate = require("log-update");

const { isFile } = require("./utils");
const defaultOptions = require("./defaultOptions");
const isFunction = require("lodash/isFunction");
const defaultsDeep = require("lodash/defaultsDeep");
const getCompileStream = require("./getCompileStream");
const compile = require("./compile");
const compileDir = require("./compileDir");
const watcher = require("./watcher");
const log = require("./logger");

// const babelLoader = require("./loaders/babel");
// const tsLoader = require("./loaders/typescript");
// const cssLoader = require("./loaders/css");
// const sassLoader = require("./loaders/sass");
// const lessLoader = require("./loaders/less");
// const postcssLoader = require("./loaders/postcss");

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

    options.appSrc = path.resolve(options.cwd, appSrc);
    options.outDir = path.resolve(options.cwd, outDir);

    if (options.clean) {
        fs.emptyDirSync(options.outDir);
    }

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

    const fList = [];

    options.glob.forEach(patten => {
        const list = glob.sync(patten, {
            cwd: options.appSrc,
            allowEmpty: true
        });

        fList.push(...list);
    });

    files = new Set(fList);

    totalFile = files.size;

    const compileStream = getCompileStream(options.glob, options).pipe(
        through2.obj(function(file, _, cb) {
            pTotal++;

            const process = parseInt((pTotal * 100) / totalFile);
            writeLog(process);

            this.push(file);

            cb();
        })
        // .pipe(plumber())
    );

    compile(compileStream, options).on("finish", () => {
        if (options.watch) {
            console.log();
            log(" Start watching files...");
            console.log();
            watcher(options);
        }
    });
};
