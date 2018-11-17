const singleLog = require('single-line-log').stdout;

module.exports = log;

let isSingle = false;

function log(msg, ...rest) {
    if (!log.showLog) return;

    if (isSingle) {
        log.clear();
    }

    const date = (new Date()).toISOString();
    console.log('[' + date + '] - ' + msg, ...rest);
}

log.single = function (msg) {
    if (!log.showLog) return;

    isSingle = true;

    singleLog(module.exports.msg(msg));
}

log.clear = function () {
    if (!log.showLog) return;

    isSingle = false;

    console.log();
}

log.msg = function (msg) {
    const date = (new Date()).toISOString();
    return '[' + date + '] - ' + msg;
}

log.showLog = true;