const execSync = require('child_process').execSync;
const fs = require('fs-extra');
const log = require('./logger');

module.exports = function (loader, cnpm) {
    if (loader._installPromise) return loader._installPromise;

    let executor = cnpm ? 'cnpm' : 'npm';

    const pkgFile = process.cwd() + '/package.json';
    let pkg = {};
    if (fs.existsSync(pkgFile)) {
        pkg = require(pkgFile);
    }
    const allDeps = Object.assign({}, pkg.dependencies, pkg.devDependencies);

    const deps = (loader.deps || []).filter(dep => {
        return !(dep in allDeps)
    });

    const devDeps = (loader.devDeps || []).filter(dep => {
        return !(dep in allDeps)
    });

    if (deps.length || devDeps.length) {
        log('开始安装依赖[' + loader.name + ']:');
    }

    let cmd = '';

    if (deps.length) {
        cmd = `${executor} install --save ${dep.join(' ')}`;
        log(cmd);
        execSync(cmd);
    }

    if (devDeps.length) {
        cmd = `${executor} install --save-dev ${devDeps.join(' ')}`;
        log(cmd);
        execSync(cmd);
    }

    if (deps.length || devDeps.length) {
        log('依赖安装完成。');
    }

    return loader._installPromise = Promise.resolve();
}