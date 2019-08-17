const defaultsDeep = require("lodash/defaultsDeep");

module.exports = function(options) {
    const browserslist = [
        ">0.2%",
        "not dead",
        "not ie <= 11",
        "not op_mini all"
    ];

    if (options.mode === "production") {
        if (options.minify === undefined) {
            options.minify = true;
        }
    }

    // const targets = {};

    // if (options.target === "node") {
    //     targets.node = "current";
    // } else {
    //     targets.browsers = browserslist;
    // }

    const defaults = {
        cwd: process.cwd(), // 工作路径
        glob: ["**/?(*).*", "**/*"],
        globOptions: {},
        mode: "none", //转换模式：none（默认值）、development或production，production模式下minify生效
        cleanDest: true, //转换前清空输出目录
        exclude: null, //文件不进行编译，但会复制
        ignore: null, //文件不进行编译，也不会复制
        watch: false,
        watchOptions: {},
        cnpm: false,
        target: "web", // node web
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
            transformDefine: {
                "process.env.NODE_ENV": options.mode,
                __DEV__: options.mode !== "production"
            },
            // targets,
            resolver: {},
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
