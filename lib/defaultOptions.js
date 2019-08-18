const defaultsDeep = require("lodash/defaultsDeep");
const fs = require("fs-extra");
const os = require("os");

module.exports = function(options) {
    const browserslist = [
        ">0.2%",
        "not dead",
        "not ie <= 11",
        "not op_mini all"
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
        // browserslist,
        babelOptions: {
            decoratorsBeforeExport: true,
            strictMode: true,
            useFlow: true,
            minify: !!options.minify,
            minifyOptions: {},
            runtimeOptions: {},
            // transformDefine: {
            //     "process.env.NODE_ENV": options.mode,
            //     __DEV__: options.mode !== "production"
            // },
            // targets,
            // resolver: {},
            presets: [],
            plugins: []
        },
        postcssOptions: {},
        scssOptions: {},
        lessOptions: {},
        loaders: [],
        plugins: [],
        banner: null // string function
    };

    return defaultsDeep({}, options, defaults);
};
