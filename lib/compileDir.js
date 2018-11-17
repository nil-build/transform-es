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
            const startTime = Date.now();
            let n = 0;
            // const promises = [];

            files.forEach(file => {
                const absSrcFile = path.resolve(options.cwd, appSrc, file);
                const absDestFile = path.resolve(options.cwd, appDest, file);

                tasks.push({
                    file,
                    src: absSrcFile,
                    dest: absDestFile
                });

                // const ret = compile(absSrcFile, absDestFile, options);
                // promises.push(ret);
            });

            log(success(`文件总数: ${tasks.length}`));

            log.single(
                success(`转换进度: 0%`)
            )

            return RPQueue(
                tasks,
                {
                    limit: options.taskRunner,
                    process: task => compile(task.src, task.dest, options)
                        .then(
                            () => {
                                n++;

                                const process = ~~(n * 100 / tasks.length);

                                log.single(
                                    success(`转换进度: ${process}% [${task.file}]`)
                                )
                            }
                        )
                }
            )
                .then(
                    () => {
                        log.clear();
                        log.single(
                            success(`转换完成，耗时: ${~~((Date.now() - startTime) / 1000)} 秒`)
                        );
                        log.clear();
                    }
                );

            //return Promise.all(promises);
        })
}