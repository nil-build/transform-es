const babel = require("@babel/core");
const babelConfig = require('../config/babel.config');

function babelLoader(input, options) {
    let babelOptions = options.babelConfig;
    if (!babelOptions) {
        babelOptions = babelConfig(options);
    }

    const result = babel.transformSync(input.data, babelOptions);

    return result.code;
}

babelLoader.deps = ['@babel/runtime', '@babel/runtime-corejs2'];
babelLoader.devDeps = [];

module.exports = babelLoader;