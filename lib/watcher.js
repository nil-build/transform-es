const path = require("path");
const gulp = require("gulp");
const chalk = require("chalk");
const log = require("./logger");
const compile = require("./compile");
const fs = require("fs-extra");

const blue = chalk.keyword("green");

module.exports = function(options) {
    const watcher = gulp.watch(options.glob, {
        cwd: options.appSrc,
        allowEmpty: true,
        delay: 300
    });

    watcher.on("change", function(file, stats) {
        compile(file, options);
        log("文件修改：%s", blue(file));
    });

    watcher.on("add", function(file, stats) {
        compile(file, options);
        log("文件新增：%s", blue(file));
    });

    watcher.on("unlink", function(file, stats) {
        fs.removeSync(path.resolve(options.appSrc, file));
        log("文件删除：%s", blue(file));
    });

    watcher.on("error", function() {
        // ignore
    });
};
