const babel = require("@babel/core");
const babelConfig = require('../config/babel.config');

function babelLoader(input, options) {
    let babelOptions = options.babelConfig;
    if (!babelOptions) {
        babelOptions = babelConfig(options);
    }

    const result = babel.transformSync(input.data, Object.assign({}, babelOptions, {
        filename: input.fileanme
    }));

    return result.code;
}

babelLoader.deps = ['@babel/runtime', '@babel/runtime-corejs2'];
babelLoader.devDeps = [
    '@babel/plugin-transform-modules-amd',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-modules-systemjs',
    '@babel/plugin-transform-modules-umd'
];

module.exports = babelLoader;