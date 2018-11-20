const path = require('path');
const fs = require("fs-extra");
const chalk = require('chalk');

const { isFile } = require('./utils');
const defaultOptions = require('./defaultOptions');
const compile = require('./compile');
const compileDir = require('./compileDir');
const watcher = require('./watcher');
const log = require('./logger');

const babelLoader = require('./loaders/babel');
const sassLoader = require('./loaders/sass');
const lessLoader = require('./loaders/less');
const postcssLoader = require('./loaders/postcss');

const bannerPlugin = require('./plugins/banner');

const success = chalk.keyword('green');

module.exports = async function (appSrc = 'src', appDest = 'lib', options = {}) {
    const defaults = {
        loaders: [
            {
                test: /\.jsx?$/i,
                loader: babelLoader,
                output: function (info) {
                    return `${info.name}.js`
                }
            },
            {
                test: /\.css$/i,
                loader: [postcssLoader],
                output: function (info) {
                    return `${info.name}.css`
                }
            },
            {
                test: /\.scss$/i,
                loader: [postcssLoader, sassLoader],
                output: function (info) {
                    return `${info.name}.css`
                }
            },
            {
                test: /\.less$/i,
                loader: [postcssLoader, lessLoader],
                output: function (info) {
                    return `${info.name}.css`
                }
            },
        ],
        plugins: [
            bannerPlugin,
        ]
    }

    appSrc = appSrc || '.';
    appDest = appDest || 'dest';

    options = defaultOptions(Object.assign(
        {},
        defaults,
        options
    ));
    //是否显示Log
    log.showLog = options.log;

    const appSrcFile = path.resolve(options.cwd, appSrc);

    if (isFile(appSrcFile)) {
        compile(appSrcFile, path.resolve(options.cwd, appDest), options);
        log(success('转换完成: 100%'));
        return;
    }

    if (options.cleanDest) {
        fs.emptyDirSync(path.resolve(options.cwd, appDest));
    }

    await compileDir(appSrc, appDest, options);

    //log(success('转换完成: 100%'));

    if (options.watch) {
        watcher(appSrc, appDest, options);
    }
}