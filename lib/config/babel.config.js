module.exports = function({
    useFlow,
    minify,
    minifyOptions,
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
        plugins: [...plugins].filter(v => v)
    };
};
