module.exports = function({
    useFlow,
    minify,
    minifyOptions,
    runtimeOptions,
    transformDefine,
    resolver,
    plugins,
    presets,
    ...reset
}) {
    const _presets = [
        [
            require.resolve("babel-preset-packez"),

            {
                ...reset
            }
        ],
        useFlow ? require.resolve("@babel/preset-flow") : null,
        minify
            ? [
                  require.resolve("babel-preset-minify"),
                  {
                      ...minifyOptions
                  }
              ]
            : null
    ].filter(v => v);

    return {
        babelrc: false,
        compact: false,
        presets: _presets,
        plugins: [
            [
                require.resolve("babel-plugin-transform-define"),
                { ...transformDefine }
            ],
            [require.resolve("babel-plugin-module-resolver"), { ...resolver }],
            plugins
        ].filter(v => v)
    };
};
