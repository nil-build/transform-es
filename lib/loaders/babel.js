const babel = require("@babel/core");
const babelConfig = require('../config/babel.config');

function babelLoader(input, options) {
    return new Promise((resolve, reject) => {
        let babelOptions = options.babelConfig;
        if (!babelOptions) {
            babelOptions = babelConfig(options);
        }

        babel.transform(
            input.data,
            Object.assign(
                {},
                babelOptions,
                {
                    filename: input.fileanme
                }
            ),
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.code);
                }
            }
        );
        //return result.code;
    });
}

babelLoader.deps = ['@babel/runtime', '@babel/runtime-corejs2'];
babelLoader.devDeps = [
    '@babel/plugin-transform-modules-amd',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-modules-systemjs',
    '@babel/plugin-transform-modules-umd'
];

module.exports = babelLoader;