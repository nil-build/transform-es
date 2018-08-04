const path = require('path');
const fs = require("fs-extra");
const glob = require('fast-glob');

module.exports = function (appSrc = 'src', appDist = 'dest', options = {}) {
    const defaults = {
        cwd: process.cwd(),
        cleanDist: true,
        globOptions: {},
    }

    appSrc = appSrc || '.';

    options = Object.assign({}, defaults, options);

    if (options.cleanDist) {
        fs.emptyDirSync(path.resolve(options.cwd, appDist));
    }

    glob(
        ["**/?(*).*", "**/*"],
        Object.assign(
            {
                onlyFiles: false,
                //absolute: true,
            },
            options.globOptions,
            {
                cwd: path.resolve(options.cwd, appSrc)
            }
        )
    ).then(files => {
        files.forEach(file => {
            const absSrcFile = path.resolve(options.cwd, appSrc, file);
            const absDestFile = path.resolve(options.cwd, appDist, file);

            fs.copySync(absSrcFile, absDestFile);
        })
    }).catch(console.error)
}