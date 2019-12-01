#!/usr/bin/env node

const program = require("commander");
const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const chalk = require("chalk");
const pkg = require("../package.json");
const transformEs = require("./index");
const log = require("./logger");

const success = chalk.keyword("green");

program
    .version(pkg.version)
    .option("-w, --watch", "是否监控文件改变", false)
    .option("-d, --outDir [outDir]", "输出到指定目录，默认为 lib", "lib")
    .option("-c, --clean", "转换前清空输出目录", false)
    .option(
        "-t, --target [target]",
        "转换目标格式：web | node | esm 默认为 web",
        /^node|web|esm|cjs|commonjs|amd|umd|systemjs|auto$/,
        "web"
    )
    .option("--config [config]", "配置文件路径", "./transform-es.config.js")
    .option("--state [state]", "配置文件路径", "")
    .parse(process.argv);

const options = {
    configFile: program.config,
    mode: program.mode,
    state: program.state,
    watch: !!program.watch,
    clean: !!program.clean
};

if (program.target === "node") {
    options.babel = {
        targets: {
            node: "current"
        }
    };
} else if (program.target === "esm") {
    options.babel = {
        modules: false
    };
} else {
    options.babel = {
        modules: program.target === "web" ? "commonjs" : program.target
    };
}

const exec = program.args[0];

if (exec === "init") {
    const pkgFile = process.cwd() + "/package.json";
    let userPkg = {};
    if (fs.existsSync(pkgFile)) {
        userPkg = require(pkgFile);
    }

    const scripts = userPkg.scripts || {};

    userPkg.scripts = scripts;

    if (!fs.existsSync(process.cwd() + "/transform-es.config.js")) {
        fs.writeFileSync(
            path.resolve(process.cwd(), "transform-es.config.js"),
            `
module.exports = function(options, state){
    return {
        babel: {
            // babel options
            loose: true,
            presets: [],
            plugins: []
        },
        postcss: {},
        typescript: {}
    };
}
`
        );

        log(success(`add transform-es.config.js successfully.`));
    }

    if (!scripts["dest"]) {
        scripts["dest"] = "transform-es ./src -t web -d lib -w -c";
        log(success(`add scripts.dest = ${scripts["dest"]} successfully.`));
    }

    if (!scripts["dest:esm"]) {
        scripts["dest:esm"] = "transform-es ./src -t esm -d esm -c";
        log(
            success(
                `add scripts["dest:esm"] = ${scripts["dest:esm"]} successfully.`
            )
        );
    }

    if (!scripts["dest:cjs"]) {
        scripts["dest:cjs"] = "transform-es ./src -t web -d cjs -c";
        log(
            success(
                `add scripts["dest:cjs"] = ${scripts["dest:cjs"]} successfully.`
            )
        );
    }

    if (!scripts["dest:node"]) {
        scripts["dest:node"] = "transform-es ./src -t node -d lib -c";
        log(
            success(
                `add scripts["dest:node"] = ${scripts["dest:node"]} successfully.`
            )
        );
    }

    fs.writeFileSync(pkgFile, JSON.stringify(userPkg, null, 2) + os.EOL);

    process.exit(1);
}

let src = "src";

if (program.args.length) src = program.args[0];

transformEs(src, program.outDir, options);
