module.exports = function({
    // helpers,
    //regenerator,
    useFlow,
    corejs,
    target,
    minify,
    defines,
    resolve,
    browserslist,
    babelMinifyOptions,
    babelRuntimeOptions,
    babelPresetEnvOptions,
    modules,
    strictMode,
    loose,
    useBuiltIns
}) {
    const presets = [
        [
            require.resolve("babel-preset-packez"),
            Object.assign(
                target === "node"
                    ? {
                          targets: {
                              node: "current"
                          }
                      }
                    : {
                          targets: {
                              browsers: browserslist
                          },
                          loose,
                          modules,
                          strictMode,
                          useBuiltIns,
                          runtimeOptions: babelRuntimeOptions
                      },
                babelPresetEnvOptions
            )
        ],
        useFlow ? require.resolve("@babel/preset-flow") : null,
        minify
            ? [
                  require.resolve("babel-preset-minify"),
                  Object.assign({}, babelMinifyOptions)
              ]
            : null
    ].filter(v => v);

    return {
        babelrc: false,
        compact: false,
        presets: presets,
        plugins: [
            [
                require.resolve("babel-plugin-transform-define"),
                Object.assign({}, defines)
            ],
            [
                require.resolve("babel-plugin-module-resolver"),
                Object.assign({}, resolve)
            ]
        ].filter(v => v)
    };
};
