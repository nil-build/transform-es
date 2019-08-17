const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");

const { isFile } = require("./utils");
const defaultOptions = require("./defaultOptions");
const isFunction = require("lodash/isFunction");
const defaultsDeep = require("lodash/defaultsDeep");
const compile = require("./compile");
const compileDir = require("./compileDir");
const watcher = require("./watcher");
const log = require("./logger");

const babelLoader = require("./loaders/babel");
const sassLoader = require("./loaders/sass");
const lessLoader = require("./loaders/less");
const postcssLoader = require("./loaders/postcss");

const bannerPlugin = require("./plugins/banner");

const success = chalk.keyword("green");

module.exports = async function(appSrc = "src", appDest = "lib", options = {}) {
    const configFile = options.configFile;
    let configFileOptions = {};

    if (configFile) {
        configFileOptions = require(path.resolve(process.cwd(), configFile));
        if (isFunction(configFileOptions)) {
            configFileOptions = configFileOptions(options);
        }

        delete options.configFile;
    }

    options = defaultsDeep({}, options, configFileOptions);

    options = defaultOptions(options);

    const loaders = [];

    loaders.push({
        test: /\.jsx?$/i,
        use: [
            {
                loader: babelLoader,
                options: options.babelOptions
            }
        ],
        output: function(info) {
            return `${info.name}.js`;
        }
    });

    loaders.push({
        test: /\.css$/i,
        use: [
            {
                options: options.postcssOptions,
                loader: postcssLoader
            }
        ],
        output: function(info) {
            return `${info.name}.css`;
        }
    });

    loaders.push({
        test: /^[^_]\w*\.scss$/i,
        use: [
            {
                options: options.postcssOptions,
                loader: postcssLoader
            },
            {
                options: options.scssOptions,
                loader: sassLoader
            }
        ],
        output: function(info) {
            return `${info.name}.css`;
        }
    });

    loaders.push({
        test: /^[^_]\w*\.less$/i,
        use: [
            {
                options: options.postcssOptions,
                loader: postcssLoader
            },
            {
                options: options.lessOptions,
                loader: lessLoader
            }
        ],
        output: function(info) {
            return `${info.name}.css`;
        }
    });

    options.loaders = loaders;

    options.plugins = [bannerPlugin];

    appSrc = appSrc || ".";
    appDest = appDest || "dest";
    //是否显示Log
    log.showLog = options.log;

    const appSrcFile = path.resolve(options.cwd, appSrc);

    if (isFile(appSrcFile)) {
        compile(appSrcFile, path.resolve(options.cwd, appDest), options);
        log(success("转换完成: 100%"));
        return;
    }

    if (options.cleanDest) {
        fs.emptyDirSync(path.resolve(options.cwd, appDest));
    }

    await compileDir(appSrc, appDest, options);

    if (options.watch) {
        watcher(appSrc, appDest, options);
    }
};
