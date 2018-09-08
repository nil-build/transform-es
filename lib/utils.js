const fs = require("fs-extra");

function matchFile(file, regexps) {
    if (!regexps) return false;
    regexps = Array.isArray(regexps) ? regexps : [regexps];
    return regexps.some(reg => reg.test(file));
}

function isFile(path) {
    const stats = fs.statSync(path)
    return stats.isFile();
}

function isDir(path) {
    const stats = fs.statSync(path)
    return stats.isDirectory();
}

module.exports = {
    matchFile,
    isFile,
    isDir
}