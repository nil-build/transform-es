const fs = require("fs-extra");
const path = require('path');
const execSync = require('child_process').execSync;

function installDeps() {
    const pkgFile = process.cwd() + '/package.json';
    let pkg = {};
    if (fs.existsSync(pkgFile)) {
        pkg = require(pkgFile);
    }
    //devDependencies
    const deps = Object.assign({}, pkg.dependencies, pkg.devDependencies);
    if (!deps['node-sass']) {
        console.log("安装依赖中: npm install --save-dev node-sass");
        execSync('npm install --save-dev node-sass');
    }
}

module.exports = function (input, options) {
    installDeps();
    const sass = require('node-sass');

    const result = sass.renderSync(Object.assign({}, options.sassConfig, {
        data: input.data,
        includePaths: [path.dirname(input.file)]
    }));

    return result.css;
}