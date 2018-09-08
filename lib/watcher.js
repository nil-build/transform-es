const path = require('path');
const chokidar = require('chokidar');
const debounce = require('debounce');
const chalk = require('chalk');
const log = require('./logger');
const compile = require('./compile');
const fs = require("fs-extra");

const blue = chalk.blue;
const error = chalk.bold.red;

module.exports = function (appSrc, appDest, options) {
    const cwd = options.cwd;
    const absSrc = path.resolve(cwd, appSrc);
    const absDest = path.resolve(cwd, appDest);

    const watcher = chokidar.watch(
        options.glob,
        Object.assign(
            {},
            {
                ignoreInitial: true,
                usePolling: true,
                interval: 300,
                binaryInterval: 500,
            },
            options.watchOptions,
            {
                cwd: absSrc
            }
        )
    );

    const delay = 300;
    const compileQueues = new Set();

    const delayCompile = debounce(function () {
        compileQueues.forEach(file => {
            const absSrcFile = path.resolve(cwd, appSrc, file);
            const absDestFile = path.resolve(cwd, appDest, file);

            compile(absSrcFile, absDestFile, options);

            log('%s文件发生变动，更新完成', blue(file));
        });
    }, delay);

    const onFileChange = (file) => {
        compileQueues.add(file);
        delayCompile();
    };

    const onFileRemove = (file) => {
        fs.removeSync(path.resolve(absDest, file));
        log('%s文件发生不存在，更新完成', blue(file));
    };

    const onDirChange = (file) => {
        fs.ensureDirSync(path.resolve(absDest, file));
        log('%s文件发生变动，更新完成', blue(file));
    }

    // Add event listeners.
    watcher
        .on('add', onFileChange)
        .on('change', onFileChange)
        .on('unlink', onFileRemove)
        .on('addDir', onDirChange)
        .on('unlinkDir', onFileRemove)
        .on('error', err => log(error(`${err}`)))
        .on('ready', () => log('%s文件夹监听中...', blue(appSrc)))
}