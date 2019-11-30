const logUpdate = require("log-update");

module.exports = log;

function log(msg, ...rest) {
    const date = new Date().toLocaleString();

    console.log("[" + date + "] - " + msg, ...rest);
}

log.update = function(msg) {
    logUpdate(msg);
};

log.clear = function() {
    console.log();
};

log.msg = function(msg) {
    const date = new Date().toLocaleString();
    return "[" + date + "] - " + msg;
};
