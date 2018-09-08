module.exports = function (options) {
    const defaults = {
        cwd: process.cwd(),
        glob: ["**/?(*).*", "**/*"],
        globOptions: {},
        cleanDest: true,
        babelConfig: null,
        exclude: null,//文件不进行编译，但会复制
        ignore: null,//文件不进行编译，也不会复制
        watch: false,
        watchOptions: {},
        target: 'web', // node web
        babelRuntimeHelpers: true, // remove
        babelRuntimeOptions: {
            helpers: options.babelRuntimeHelpers == null ? true : options.babelRuntimeHelpers
        },
        sassConfig: null,
        lessConfig: null,
        loaders: [],
    }
    return Object.assign({}, defaults, options)
}