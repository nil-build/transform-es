const glob = require('fast-glob');
const path = require('path');
const compile = require('./compile');

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
            const promises = [];

            files.forEach(file => {
                const absSrcFile = path.resolve(options.cwd, appSrc, file);
                const absDestFile = path.resolve(options.cwd, appDest, file);

                const ret = compile(absSrcFile, absDestFile, options);
                promises.push(ret);
            });

            return Promise.all(promises);
        })
}