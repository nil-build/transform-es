const path = require('path');
const fs = require("fs-extra");
const chokidar = require('chokidar');
const glob = require('fast-glob');
const debounce = require('debounce');
const chalk = require('chalk');

//loaders
const babelLoader = require('./loaders/babel-loader');
const sassLoader = require('./loaders/sass-loader');
const lessLoader = require('./loaders/less-loader');

const log = function (msg, ...rest) {
    const date = (new Date()).toISOString();
    console.log('[' + date + '] - ' + msg, ...rest);
}
const blue = chalk.blue;
const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.keyword('green');

function isFile(path) {
    const stats = fs.statSync(path)
    return stats.isFile();
}

function isDir(path) {
    const stats = fs.statSync(path)
    return stats.isDirectory();
}

function compileFile(srcFile, targetFile, options) {

    options.loaders.forEach(async item => {
        const reg = item.test;

        if (!reg.test(srcFile)) {
            return;
        }

        const handlers = Array.isArray(item.loader) ? item.loader : [item.loader];

        const ext = path.extname(targetFile);
        const name = path.basename(targetFile, ext);
        const dir = path.dirname(targetFile);
        let fileName = name + ext;

        const input = {
            file: srcFile,
            data: fs.readFileSync(srcFile).toString(),
        };
        try {
            for (let i = handlers.length; i > 0; i--) {
                let result = await handlers[i - 1](input, options, item);
                if (result !== undefined) {
                    input.data = result;
                }
            }
        } catch (e) {
            console.error(e);
        }

        if (item.output) {
            fileName = item.output({
                ext,
                name,
            });
        }

        fs.outputFileSync(path.resolve(dir, fileName), input.data);
    });

}

function matchFile(file, regexps) {
    if (!regexps) return false;
    regexps = Array.isArray(regexps) ? regexps : [regexps];
    return regexps.some(reg => reg.test(file));
}

function shouldCompileFile(file, options) {
    if (matchFile(file, options.exclude)) {
        return false;
    }
    const includes = options.loaders.map(item => item.test);

    return matchFile(file, includes)
}

function processFile(absSrcFile, absDestFile, options) {

    if (matchFile(absSrcFile, options.ignore)) {
        return;
    }
    if (isDir(absSrcFile)) {
        fs.ensureDirSync(absDestFile);
    } else if (shouldCompileFile(absSrcFile, options)) {
        compileFile(absSrcFile, absDestFile, options);
    } else {
        fs.copySync(absSrcFile, absDestFile);
    }
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

                processFile(absSrcFile, absDestFile, options);
                // if (shouldCompileFile(absSrcFile, options)) {
                //     compileFile(absSrcFile, absDestFile, options);
                // } else {
                //     fs.copySync(absSrcFile, absDestFile);
                // }
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

            processFile(absSrcFile, absDestFile, options);
            // if (shouldCompileFile(absSrcFile, options)) {
            //     compileFile(absSrcFile, absDestFile, options);
            // } else {
            //     fs.copySync(absSrcFile, absDestFile);
            // }

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

module.exports = async function (appSrc = 'src', appDest = 'lib', options = {}) {
    const defaults = {
        cwd: process.cwd(),
        glob: ["**/?(*).*", "**/*"],
        globOptions: {},
        cleanDest: true,
        babelConfig: null,
        exclude: null,//文件不进行编译，但会复制
        ignore: null,//文件不进行编译，也不会复制
        watch: false,
        watchOptions: {},
        target: 'web', // node web
        babelRuntimeHelpers: true, // remove
        babelRuntimeOptions: {
            helpers: options.babelRuntimeHelpers == null ? true : options.babelRuntimeHelpers
        },
        sassConfig: null,
        lessConfig: null,
        loaders: [
            {
                test: /\.jsx?$/i,
                loader: babelLoader,
                output: function (info) {
                    return `${info.name}.js`
                }
            },
            {
                test: /\.scss$/i,
                loader: sassLoader,
                output: function (info) {
                    return `${info.name}.css`
                }
            },
            {
                test: /\.less$/i,
                loader: lessLoader,
                output: function (info) {
                    return `${info.name}.css`
                }
            },
        ],
    }

    appSrc = appSrc || '.';
    appDest = appDest || 'dest';

    options = Object.assign({}, defaults, options);

    const appSrcFile = path.resolve(options.cwd, appSrc);

    if (isFile(appSrcFile)) {
        compileFile(appSrcFile, path.resolve(options.cwd, appDest), options);
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