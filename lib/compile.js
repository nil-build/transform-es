const fs = require("fs-extra");
const { matchFile, isDir } = require("./utils");
const compileFile = require("./compileFile");

function shouldCompileFile(file, options) {
    if (matchFile(file, options.exclude)) {
        return false;
    }

    return true;
}

module.exports = async function(absSrcFile, absDestFile, options) {
    if (matchFile(absSrcFile, options.ignore)) {
        return;
    }
    if (isDir(absSrcFile)) {
        return fs.ensureDir(absDestFile);
    } else if (shouldCompileFile(absSrcFile, options)) {
        return compileFile(absSrcFile, absDestFile, options);
    } else {
        return fs.copy(absSrcFile, absDestFile);
    }
};
