#!/usr/bin/env node

const program = require("commander");
const fs = require("fs-extra");
const pkg = require("../package.json");
const transformEs = require("./index");

program
    .version(pkg.version)
    .option("-w, --watch", "是否监控文件改变", true)
    .option("-f, --outFile <outFile>", "输出到文件，只有单文件转换有效")
    .option("-d, --outDir [outDir]", "输出到指定目录，默认为 lib", "lib")
    .option(
        "-t, --target [target]",
        "转换目标格式：web | node 默认为 web",
        /^node|web$/,
        "web"
    )
    .option("-c, --clear", "转换前清空输出目录", true)
    .option("-m, --minify", "压缩JS,SCSS,LESS,CSS文件", true)
    .option("--log [log]", "输出日志", /^true|false$/, "true")
    .option("--taskRunner [taskRunner]", "并发执行任务数", "15")
    .option(
        "--mode [mode]",
        "转换模式：none（默认值）、development或production，production模式下minify生效",
        "none"
    )
    .option("--banner [banner]", "在每个转换文件顶部添加注释文本", "")
    .option("--ignore <ignore>", "对匹配成功的文件不进行转换和复制")
    .option("--exclude <excluede>", "对匹配成功的文件后只复制不转换")
    .option("--config [config]", "配置文件路径", "./transform-es.config.js")
    .option("--cnpm", "使用cnpm安装依赖", true)
    .parse(process.argv);

const options = {
    configFile: program.config,
    mode: program.mode,
    minify: !!program.minify,
    banner: program.banner,
    watch: !!program.watch,
    target: program.target,
    cleanDest: !!program.clear,
    cnpm: !!program.cnpm,
    taskRunner: parseInt(program.taskRunner),
    log: program.log === "false" ? false : true,
    ignore: program.ignore
        ? program.ignore.split(",").map(reg => new RegExp(reg))
        : null,
    exclude: program.exclude
        ? program.exclude.split(",").map(reg => new RegExp(reg))
        : null
};

const exec = program.args[0];
const scripts = `
module.exports = function(){
    return {
        babel: {}
    };
}
`;

if (exec === "init") {
    fs.writeFileSync("./transform-es.config.js", scripts);
    console.log("配置文件生成成功.");
    return;
}

let src = "src";

if (program.args.length) src = program.args[0];

transformEs(src, program.outFile || program.outDir, options);
