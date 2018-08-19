const browsers = require('./browserslist.config');

module.exports = function () {
    const presets = [
        [require.resolve('babel-preset-env'), {
            "targets": {
                "ie": 9,
                "browsers": browsers
            },
            useBuiltIns: false,
        }],
        require.resolve('babel-preset-react'),
        require.resolve('babel-preset-flow')
    ];

    return {
        "babelrc": false,
        "compact": false,
        "presets": presets,
        "plugins": [
            require.resolve("babel-plugin-syntax-dynamic-import"),
            require.resolve("babel-plugin-transform-async-generator-functions"),
            require.resolve("babel-plugin-transform-async-to-generator"),
            require.resolve("babel-plugin-transform-class-properties"),
            require.resolve("babel-plugin-transform-do-expressions"),
            require.resolve("babel-plugin-transform-export-extensions"),
            require.resolve("babel-plugin-transform-function-bind"),
            require.resolve("babel-plugin-transform-object-assign"),
            require.resolve("babel-plugin-transform-object-rest-spread"),
            require.resolve("babel-plugin-transform-react-jsx"),
            require.resolve("babel-plugin-transform-decorators-legacy"),
            require.resolve("babel-plugin-transform-regenerator"),
            //"babel-plugin-transform-proto-to-assign",//IE10以下不支持__proto__
            [require.resolve("babel-plugin-transform-runtime"), {
                helpers: true,
                polyfill: true,
                regenerator: true,
            }]
        ]
    };

}