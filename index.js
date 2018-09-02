const path = require('path');
const execSync = require('child_process').execSync;
const fs = require("fs-extra");
const chokidar = require('chokidar');
const glob = require('fast-glob');
const debounce = require('debounce');
const babel = require("@babel/core");
const chalk = require('chalk');
const babelConfig = require('./config/babel.config');
const babelNodeConfig = require('./config/babel.node.config');


const log = function (msg, ...rest) {
    const date = (new Date()).toISOString();
    console.log('[' + date + '] - ' + msg, ...rest);
}
const blue = chalk.blue;
const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.keyword('green');

function installDeps() {
    const pkgFile = process.cwd() + '/package.json';
    let pkg = {};
    if (fs.existsSync(pkgFile)) {
        pkg = require(pkgFile);
    }

    if (!pkg.dependencies || !pkg.dependencies['@babel/runtime']) {
        execSync('npm install --save @babel/runtime @babel/runtime-corejs2');
    }
}

function compileFile(srcFile, targetFile, options) {
    const result = babel.transformFileSync(srcFile, options);
    fs.outputFileSync(targetFile, result.code);
}

function compileDir(appSrc = 'src', appDest = 'dest', options = {}) {
    return new Promise((resolve, reject) => {
        glob(
            options.glob,
            Object.assign(
                {
                    onlyFiles: false,
                },
                options.globOptions,
                {
                    cwd: path.resolve(options.cwd, appSrc)
                }
            )
        ).then(files => {
            files.forEach(file => {
                const absSrcFile = path.resolve(options.cwd, appSrc, file);
                const absDestFile = path.resolve(options.cwd, appDest, file);

                let needCompile = options.include.test(file);

                if (options.exclude) {
                    needCompile = options.exclude.test(file);
                }

                if (needCompile) {
                    compileFile(absSrcFile, absDestFile, options.babelConfig);
                } else {
                    fs.copySync(absSrcFile, absDestFile);
                }
            });
            resolve();
        }).catch(err => reject(err));
    });
}



function watchSrc(appSrc, appDest, options) {
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

    const compile = debounce(function () {
        compileQueues.forEach(file => {
            const absSrcFile = path.resolve(cwd, appSrc, file);
            const absDestFile = path.resolve(cwd, appDest, file);

            let needCompile = options.include.test(file);

            if (options.exclude) {
                needCompile = options.exclude.test(file);
            }

            if (needCompile) {
                compileFile(absSrcFile, absDestFile, options.babelConfig);
            } else {
                fs.copySync(absSrcFile, absDestFile);
            }

            log('%s文件发生变动，更新完成', blue(file));
        });
    }, delay);

    const onFileChange = (file) => {
        compileQueues.add(file);
        compile();
    };

    const onFileRemove = (file) => {
        fs.removeSync(path.resolve(absDest, file));
        log('%s文件发生变动，更新完成', blue(file));
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

module.exports = async function (appSrc = 'src', appDest = 'dest', options = {}) {
    const defaults = {
        cwd: process.cwd(),
        glob: ["**/?(*).*", "**/*"],
        globOptions: {},
        cleanDest: true,
        //babelConfig: babelConfig,
        include: /\.js$/,
        exclude: null,
        watch: false,
        watchOptions: {},
        target: 'node', // node web
        babelRuntimeHelpers: true, // remove
        babelRuntimeOptions: {
            helpers: options.babelRuntimeHelpers == null ? true : options.babelRuntimeHelpers
        }
    }

    appSrc = appSrc || '.';
    appDest = appDest || 'dest';

    options = Object.assign({}, defaults, options);

    if (!options.babelConfig) {
        if (options.target === 'node') {
            options.babelConfig = babelNodeConfig(options.babelRuntimeOptions);
        } else {
            options.babelConfig = babelConfig(options.babelRuntimeOptions);
            installDeps();
        }
    }

    const appSrcFile = path.resolve(options.cwd, appSrc);
    const stats = fs.statSync(appSrcFile);

    if (stats.isFile()) {
        compileFile(appSrcFile, path.resolve(options.cwd, appDest), options.babelConfig);
        log(success('转换完成'));
        return;
    }

    if (options.cleanDest) {
        fs.emptyDirSync(path.resolve(options.cwd, appDest));
    }

    await compileDir(appSrc, appDest, options);

    log(success('转换完成'));

    if (options.watch) {
        watchSrc(appSrc, appDest, options);
    }

}