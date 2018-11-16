const glob = require('fast-glob');
const path = require('path');
const RPQueue = require("rp-queue");
const chalk = require('chalk');
const compile = require('./compile');
const log = require('./logger');
const success = chalk.keyword('green');

module.exports = async function compileDir(appSrc = 'src', appDest = 'dest', options = {}) {
    return glob(
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
    )
        .then(files => {
            const tasks = [];
            // const promises = [];

            files.forEach(file => {
                const absSrcFile = path.resolve(options.cwd, appSrc, file);
                const absDestFile = path.resolve(options.cwd, appDest, file);

                tasks.push({
                    src: absSrcFile,
                    dest: absDestFile
                });

                // const ret = compile(absSrcFile, absDestFile, options);
                // promises.push(ret);
            });

            log(success(`文件总数: ${tasks.length}`));

            return RPQueue(tasks, {
                limit: 5,
                process: task => compile(task.src, task.dest, options)
            });

            //return Promise.all(promises);
        })
}