const singleLog = require('single-line-log').stdout;

module.exports = log;

function log(msg, ...rest) {
    if (!log.showLog) return;

    const date = (new Date()).toISOString();
    console.log('[' + date + '] - ' + msg, ...rest);
}

log.single = function (msg) {
    if (!log.showLog) return;

    singleLog(module.exports.msg(msg));
}

log.clear = function () {
    if (!log.showLog) return;

    console.log();
}

log.msg = function (msg) {
    const date = (new Date()).toISOString();
    return '[' + date + '] - ' + msg;
}

log.showLog = true;