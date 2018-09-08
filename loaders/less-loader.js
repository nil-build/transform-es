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
    if (!deps['less']) {
        console.log("安装依赖中: npm install --save-dev less");
        execSync('npm install --save-dev less');
    }
}

module.exports = function (input, options) {
    installDeps();
    const less = require('less');

    return less.render(input.data, Object.assign({}, options.lessConfig, {
        paths: [path.dirname(input.file)]
    })).then(result => {
        return result.css;
    });
}