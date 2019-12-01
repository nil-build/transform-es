module.exports = function({ plugins, presets, ...reset }) {
    presets = [
        [
            require.resolve("babel-preset-packez"),
            {
                ...reset
            }
        ],
        ...presets
    ].filter(Boolean);

    return {
        compact: false,
        presets: presets,
        plugins: [...plugins].filter(Boolean)
    };
};
