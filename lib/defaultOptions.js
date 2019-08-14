module.exports = function(options) {
    options.resolve = options.resolve || {};
    options.resolve.alias = options.resolve.alias || {};

    options.defines = options.defines || {};

    if (options.mode === "production") {
        if (options.minify === undefined) {
            options.minify = true;
        }
        options.defines["process.env.NODE_ENV"] = "production";
        //options.resolve.alias['process.env.NODE_ENV'] = 'production';//??脑抽，估计写错了
    } else if (options.mode && options.mode !== "none") {
        options.defines["process.env.NODE_ENV"] = options.mode;
        //options.resolve.alias['process.env.NODE_ENV'] = options.mode;//??脑抽，估计写错了
    }

    const defaults = {
        cwd: process.cwd(), // 工作路径
        glob: ["**/?(*).*", "**/*"],
        globOptions: {},
        mode: "none", //转换模式：none（默认值）、development或production，production模式下minify生效
        useFlow: true,
        cleanDest: true, //转换前清空输出目录
        exclude: null, //文件不进行编译，但会复制
        ignore: null, //文件不进行编译，也不会复制
        watch: false,
        watchOptions: {},
        cnpm: false,
        target: "web", // node web
        minify: false,
        // babelMinifyOptions: {}, // babel-preset-minify
        // loose: false, // target=web有效
        // modules: "commonjs", // target=web有效 "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | false
        // useBuiltIns: false, //"usage" | "entry" | false
        // helpers: true,
        // corejs: false,
        // regenerator: true,
        // strictMode: true,
        log: true,
        taskRunner: 15,
        browserslist: [">0.2%", "not dead", "not ie <= 11", "not op_mini all"],
        resolve: {},
        defines: {}, // babel-plugin-transform-define
        // babelPresetEnvOptions: {},
        // babelRuntimeOptions: Object.assign({}, options.babelRuntimeOptions),
        // sassConfig: null,
        // lessConfig: null,
        // babelConfig: null,
        babelOptions: {},
        scssOptions: {},
        lessOptions: {},
        banner: null, // string function
        loaders: [],
        plugins: []
    };

    return Object.assign({}, defaults, options);
};
