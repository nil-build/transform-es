const path = require("path");
const chokidar = require("chokidar");
const debounce = require("debounce");
const gulp = require("gulp");
const watch = require("gulp-watch");
const through2 = require("through2");
const chalk = require("chalk");
const log = require("./logger");
const getCompileStream = require("./getCompileStream");
const compile = require("./compile");
const fs = require("fs-extra");
const RPQueue = require("rp-queue");

const blue = chalk.green;
const error = chalk.bold.red;

module.exports = function(options) {
    const watcher = gulp.watch(options.glob, {
        cwd: options.appSrc,
        allowEmpty: true,
        delay: 300
    });

    watcher.on("change", function(path, stats) {
        compile(getCompileStream(path, options), options);
        log("文件修改：%s", blue(path));
    });

    watcher.on("add", function(path, stats) {
        compile(getCompileStream(path, options), options);
        log("文件新增：%s", blue(path));
    });

    watcher.on("unlink", function(path, stats) {
        fs.removeSync(path);
        log("文件删除：%s", blue(path));
    });

    watcher.on("error", function() {
        // ignore
    });
};
