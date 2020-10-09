const logUpdate = require("log-update");

module.exports = log;

function log(msg, ...rest) {
	const date = new Date().toLocaleString();

	console.log("[" + date + "] - " + msg, ...rest);
}

log.update = function (msg) {
	const date = new Date().toLocaleString();
	logUpdate("[" + date + "] - " + msg);
};

log.clear = function () {
	logUpdate.clear();
};

let logList = [];

log.save = function (msg) {
	logList.push(msg);
};
log.flush = function () {
	if (logList.length) {
		logList.forEach(msg => console.log(msg));
		logList = [];
	}
};

log.msg = function (msg) {
	const date = new Date().toLocaleString();
	return "[" + date + "] - " + msg;
};
