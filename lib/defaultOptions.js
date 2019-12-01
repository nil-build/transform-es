const defaultsDeep = require("lodash/defaultsDeep");
const fs = require("fs-extra");
const os = require("os");

module.exports = function(options) {
    const browserslist = [
        ">= .25%",
        "not dead",
        "not op_mini all",
        "not Android 4.4.3-4.4.4",
        "not ios_saf < 10",
        // "not ie <= 11",
        "not Chrome < 50", // caniuse lastest is reporting chrome 29
        "firefox ESR"
    ];

    const pkgFile = process.cwd() + "/package.json";
    let pkg = {};
    if (fs.existsSync(pkgFile)) {
        pkg = require(pkgFile);
    }

    if (!pkg.browserslist) {
        pkg.browserslist = browserslist;

        fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2) + os.EOL);
    }

    const defaults = {
        cwd: process.cwd(), // 工作路径
        glob: ["**/*", "**/*.*", "**/.*"],
        clean: true, //转换前清空输出目录
        watch: false,
        babel: {
            decoratorsBeforeExport: true,
            strictMode: true,
            modules: "commonjs",
            useFlow: true,
            loose: true,
            runtimeOptions: {},
            presets: [],
            plugins: []
        },
        typescript: { declaration: true, jsx: "react", target: "ES6" },
        postcss: {},
        scss: {},
        less: {}
    };

    return defaultsDeep({}, options, defaults);
};
