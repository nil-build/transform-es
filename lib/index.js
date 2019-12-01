const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const glob = require("glob");
const RPQueue = require("rp-queue");

const defaultOptions = require("./defaultOptions");
const isFunction = require("lodash/isFunction");
const defaultsDeep = require("lodash/defaultsDeep");
const compile = require("./compile");
const watcher = require("./watcher");
const log = require("./logger");
const { isFile } = require("./utils");

const success = chalk.keyword("green");

module.exports = async function(appSrc = "src", outDir = "lib", options = {}) {
    let files = new Set();
    let fileTotal = 0;
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

    if (isFile(options.appSrc)) {
        compile(options.appSrc, options);
        log(success("Compile complete."));
        return;
    }

    if (options.clean) {
        fs.emptyDirSync(options.outDir);
    }

    const startTime = Date.now();

    const fList = [];

    options.glob.forEach(patten => {
        const list = glob.sync(patten, {
            cwd: options.appSrc,
            allowEmpty: true
        });

        fList.push(...list);
    });

    files = new Set(fList);

    files = [...files];

    fileTotal = files.length;

    log.update(`Start compiling...`);

    RPQueue(files, {
        limit: options.taskRunner,
        process: file => {
            const p = compile(file, options).catch(console.log);

            p.finally(() => {
                log.update(`Compiling... ${++pTotal}/${fileTotal}`);
            });

            return p;
        }
    }).finally(() => {
        log.update(
            success(
                `Compile complete (${~~((Date.now() - startTime) / 1000)}s)`
            )
        );
        if (options.watch) {
            log("Start watching files...");
            watcher(options);
        }
    });
};
