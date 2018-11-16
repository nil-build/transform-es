module.exports = function (msg, ...rest) {
    const date = (new Date()).toISOString();
    console.log('[' + date + '] - ' + msg, ...rest);
}

module.exports.msg = function (msg) {
    const date = (new Date()).toISOString();
    return '[' + date + '] - ' + msg;
}