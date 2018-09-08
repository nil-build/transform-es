const babel = require("@babel/core");
const fs = require("fs-extra");
const execSync = require('child_process').execSync;
const babelConfig = require('../config/babel.config');
const babelNodeConfig = require('../config/babel.node.config');

function installDeps() {
    const pkgFile = process.cwd() + '/package.json';
    let pkg = {};
    if (fs.existsSync(pkgFile)) {
        pkg = require(pkgFile);
    }

    if (!pkg.dependencies || !pkg.dependencies['@babel/runtime']) {
        console.log("安装依赖中: npm install --save @babel/runtime @babel/runtime-corejs2");
        execSync('npm install --save @babel/runtime @babel/runtime-corejs2');
    }
}

module.exports = function (input, options) {
    let babelOptions = options.babelConfig;
    if (!babelOptions) {
        if (options.target === 'node') {
            babelOptions = babelNodeConfig(options.babelRuntimeOptions);
        } else {
            babelOptions = babelConfig(options.babelRuntimeOptions);
            installDeps();
        }
    }
    //transformSync
    const result = babel.transformSync(input.data, babelOptions);

    //fs.outputFileSync(targetFile, result.code);
    return result.code;
}