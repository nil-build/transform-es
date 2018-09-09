module.exports = function (options) {

    const babelRuntimeOptions = {
        corejs: options.corejs ? 2 : false,
        regenerator: true,
    };

    if (options.babelRuntimeHelpers != null) {
        babelRuntimeOptions.helpers = !!options.babelRuntimeHelpers;
    }

    const defaults = {
        cwd: process.cwd(), // 工作路径
        glob: ["**/?(*).*", "**/*"],
        globOptions: {},
        cleanDest: true, //转换前清空输出目录
        exclude: null,//文件不进行编译，但会复制
        ignore: null,//文件不进行编译，也不会复制
        watch: false,
        watchOptions: {},
        cnpm: false,
        target: 'web', // node web
        minify: false,
        babelMinifyOptions: {},// babel-preset-minify
        loose: false, // target=web有效
        modules: "commonjs",// target=web有效 "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | false
        useBuiltIns: false, //"usage" | "entry" | false
        helpers: true,
        corejs: true,
        regenerator: true,
        resolve: {},
        defines: {}, // babel-plugin-transform-define
        babelPresetEnvOptions: {},
        babelRuntimeHelpers: true, // remove
        babelRuntimeOptions: Object.assign({}, babelRuntimeOptions, options.babelRuntimeOptions),
        sassConfig: null,
        lessConfig: null,
        babelConfig: null,
        banner: null, // string function
        loaders: [],
        plugins: [],
    }
    return Object.assign({}, defaults, options)
}