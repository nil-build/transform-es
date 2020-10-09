const path = require("path");
const gulp = require("gulp");
const chalk = require("chalk");
const log = require("./logger");
const compile = require("./compile");
const fs = require("fs-extra");
const blue = chalk.keyword("green");

module.exports = function (options) {
	const filter = options.filter;

	const watcher = gulp.watch(options.glob, {
		cwd: options.appSrc,
		allowEmpty: true,
		delay: 300,
	});

	watcher.on("change", async function (file, stats) {
		if (filter && !filter(file)) {
			return;
		}

		await compile(file, options);
		log("文件修改：%s", blue(file));
		log.flush();
	});

	watcher.on("add", async function (file, stats) {
		if (filter && !filter(file)) {
			return;
		}

		await compile(file, options);
		log("文件新增：%s", blue(file));
		log.flush();
	});

	watcher.on("unlink", async function (file, stats) {
		if (filter && !filter(file)) {
			return;
		}

		fs.removeSync(path.resolve(options.appSrc, file));
		log("文件删除：%s", blue(file));
		log.flush();
	});

	watcher.on("error", async function () {
		// ignore
	});
};
