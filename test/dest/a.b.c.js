'use strict';

var _desc, _value, _class;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

const path = require('path');
const fs = require("fs-extra");
const glob = require('fast-glob');

let MyApp = (_class = class MyApp {
    constructor() {
        this.title = 'test';

        this.a = () => {};
    }

    say() {}

}, (_applyDecoratedDescriptor(_class.prototype, 'say', [ta], Object.getOwnPropertyDescriptor(_class.prototype, 'say'), _class.prototype)), _class);

//cst a = 4;


MyApp.a = 3;
async function test() {
    const a = await '23';
}

test();

new Promise(r => r(1));

const x = new Set();

module.exports = function (appSrc = 'src', appDist = 'dest', options = {}) {
    const defaults = {
        cwd: process.cwd(),
        cleanDist: true,
        globOptions: {}
    };

    appSrc = appSrc || '.';

    options = Object.assign({}, defaults, options);

    if (options.cleanDist) {
        fs.emptyDirSync(path.resolve(options.cwd, appDist));
    }

    glob(["**/?(*).*", "**/*"], Object.assign({
        onlyFiles: false
        //absolute: true,
    }, options.globOptions, {
        cwd: path.resolve(options.cwd, appSrc)
    })).then(files => {
        files.forEach(file => {
            const absSrcFile = path.resolve(options.cwd, appSrc, file);
            const absDestFile = path.resolve(options.cwd, appDist, file);

            fs.copySync(absSrcFile, absDestFile);
        });
    }).catch(console.error);
};