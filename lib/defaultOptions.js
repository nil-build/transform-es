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

    if (options.mode === "production") {
        options.minify = true;
    }

    const defaults = {
        cwd: process.cwd(), // 工作路径
        glob: ["**/?(*).*", "**/*"],
        globOptions: {},
        //转换模式：none（默认值）、development或production，production模式下minify生效
        mode: "none",
        cleanDest: true, //转换前清空输出目录
        //文件不进行编译，但会复制
        exclude: null,
        //文件不进行编译，也不会复制
        ignore: null,
        watch: false,
        watchOptions: {},
        cnpm: false,
        minify: false,
        log: true,
        taskRunner: 15,
        babel: {},
        // browserslist,
        babelOptions: {
            decoratorsBeforeExport: true,
            strictMode: true,
            modules: "commonjs",
            useFlow: true,
            loose: true,
            minify: !!options.minify,
            minifyOptions: {},
            runtimeOptions: {},
            presets: [],
            plugins: []
        },
        postcssOptions: {},
        scssOptions: {},
        lessOptions: {},
        loaders: [],
        resolveLoaders: null, // (loaders: Loader[]) => Loader[]
        plugins: [],
        banner: null // string function
    };

    return defaultsDeep({}, options, defaults);
};
