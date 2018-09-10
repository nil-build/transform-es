const browserslist = require('./browserslist.config');

module.exports = function ({
    target,
    minify,
    defines,
    resolve,
    browsers,
    babelMinifyOptions,
    babelRuntimeOptions,
    babelPresetEnvOptions,
    modules,
    loose,
    useBuiltIns
}) {
    const presets = [
        [
            require.resolve('@babel/preset-env'),
            Object.assign(target === 'node' ?
                {
                    "targets": {
                        "node": "current"
                    }
                } :
                {
                    "targets": {
                        //"ie": 9,
                        "browsers": browsers || browserslist
                    },
                    loose,
                    modules,
                    useBuiltIns,
                },
                babelPresetEnvOptions
            )
        ],
        minify ? [
            require.resolve("babel-preset-minify"),
            Object.assign({}, babelMinifyOptions)
        ] : null,
        require.resolve('@babel/preset-react'),
        require.resolve('@babel/preset-flow')
    ].filter(v => v);

    babelRuntimeOptions = Object.assign({
        corejs: target === 'node' ? false : 2,
        helpers: true,
        regenerator: true,
    }, babelRuntimeOptions);

    return {
        "babelrc": false,
        "compact": false,
        "presets": presets,
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
            target === 'node' ?
                null :
                require.resolve("@babel/plugin-transform-proto-to-assign"),//IE10以下不支持__proto__
            require.resolve("@babel/plugin-transform-react-jsx"),
            [require.resolve("@babel/plugin-proposal-pipeline-operator"), { "proposal": "minimal" }],
            //"@babel/plugin-transform-react-jsx-self", 
            [require.resolve("babel-plugin-transform-define"), Object.assign({}, defines)],
            [require.resolve("babel-plugin-module-resolver"), Object.assign({}, resolve)],
            [require.resolve("@babel/plugin-transform-runtime"), babelRuntimeOptions]
        ].filter(v => v)
    };

}