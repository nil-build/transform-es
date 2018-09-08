
module.exports = function (babelRuntimeOptions) {
    return {
        "babelrc": false,
        "compact": false,
        "presets": [
            [require.resolve('@babel/preset-env'), {
                "targets": {
                    "node": "current"
                }
            }],
            require.resolve('@babel/preset-react'),
            require.resolve('@babel/preset-flow')
        ],
        "plugins": [
            require.resolve("@babel/plugin-syntax-dynamic-import"),
            require.resolve("@babel/plugin-proposal-async-generator-functions"),
            require.resolve("@babel/plugin-proposal-class-properties"),
            [require.resolve("@babel/plugin-proposal-decorators"), {
                legacy: true
            }],
            require.resolve("@babel/plugin-proposal-do-expressions"),
            require.resolve("@babel/plugin-proposal-export-default-from"),
            require.resolve("@babel/plugin-proposal-export-namespace-from"),
            require.resolve("@babel/plugin-proposal-function-bind"),
            require.resolve("@babel/plugin-proposal-function-sent"),
            require.resolve("@babel/plugin-proposal-logical-assignment-operators"),
            require.resolve("@babel/plugin-proposal-nullish-coalescing-operator"),
            require.resolve("@babel/plugin-proposal-numeric-separator"),
            require.resolve("@babel/plugin-proposal-optional-chaining"),
            require.resolve("@babel/plugin-proposal-throw-expressions"),
            require.resolve("@babel/plugin-transform-flow-strip-types"),
            //require.resolve("@babel/plugin-transform-proto-to-assign"),//IE10以下不支持__proto__
            require.resolve("@babel/plugin-transform-react-jsx"),
            [require.resolve("@babel/plugin-transform-runtime"), Object.assign({
                corejs: false,
                helpers: true,
                regenerator: true,
            }, babelRuntimeOptions)]
        ]
    };
}