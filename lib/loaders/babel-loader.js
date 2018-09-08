const babel = require("@babel/core");
const fs = require("fs-extra");
const execSync = require('child_process').execSync;
const babelConfig = require('../config/babel.config');
const babelNodeConfig = require('../config/babel.node.config');

function babelLoader(input, options) {
    let babelOptions = options.babelConfig;
    if (!babelOptions) {
        if (options.target === 'node') {
            babelOptions = babelNodeConfig(options);
        } else {
            babelOptions = babelConfig(options);
        }
    }

    const result = babel.transformSync(input.data, babelOptions);

    return result.code;
}

babelLoader.deps = ['@babel/runtime', '@babel/runtime-corejs2'];
babelLoader.devDeps = [];

module.exports = babelLoader;