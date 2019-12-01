const fs = require("fs-extra");
const isFunction = require("lodash/isFunction");
const log = require("./logger");

function matchFile(file, regexps) {
    if (!regexps) return false;

    if (isFunction(regexps)) {
        return isFunction(file);
    }

    regexps = Array.isArray(regexps) ? regexps : [regexps];
    return regexps.some(reg => reg.test(file));
}

function isFile(path) {
    const stats = fs.statSync(path);
    return stats.isFile();
}

function isDir(path) {
    const stats = fs.statSync(path);
    return stats.isDirectory();
}

function handleError(err, type) {
    log.save(type ? `\n${type}:\n${err.message}` : err.message);
    this.emit("end");
}

module.exports = { handleError, matchFile, isFile, isDir, handleError };
