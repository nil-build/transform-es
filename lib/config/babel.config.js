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
    presets = [
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
            : null,
        ...presets
    ].filter(v => v);

    return {
        compact: false,
        presets: presets,
        plugins: [
            [
                require.resolve("babel-plugin-transform-define"),
                { ...transformDefine }
            ],
            [require.resolve("babel-plugin-module-resolver"), { ...resolver }],
            ...plugins
        ].filter(v => v)
    };
};
