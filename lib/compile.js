const fs = require("fs-extra");
const { matchFile, isDir } = require('./utils');
const compileFile = require('./compileFile');

function shouldCompileFile(file, options) {
    if (matchFile(file, options.exclude)) {
        return false;
    }
    const includes = options.loaders.map(item => item.test);

    return matchFile(file, includes)
}

module.exports = async function (absSrcFile, absDestFile, options) {

    if (matchFile(absSrcFile, options.ignore)) {
        return;
    }
    if (isDir(absSrcFile)) {
        fs.ensureDirSync(absDestFile);
    } else if (shouldCompileFile(absSrcFile, options)) {
        await compileFile(absSrcFile, absDestFile, options);
    } else {
        fs.copySync(absSrcFile, absDestFile);
    }
}