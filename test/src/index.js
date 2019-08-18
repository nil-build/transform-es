const path = require("path");
const fs = require("fs-extra");
const glob = require("fast-glob");

var t = require("./cjst");

import z from "./cjst";

// @ta
class MyApp {
    static a = 3;
    title = "test";
    constructor() {}
    say() {}

    a = () => {};
}

//cst a = 4;

async function test() {
    const a = await "23";
}

test();

new Promise(r => r(1));

const x = new Set();

module.exports = function(appSrc = "src", appDist = "dest", options = {}) {
    const defaults = {
        cwd: process.cwd(),
        cleanDist: true,
        globOptions: {}
    };

    appSrc = appSrc || ".";

    options = Object.assign({}, defaults, options);

    if (options.cleanDist) {
        fs.emptyDirSync(path.resolve(options.cwd, appDist));
    }

    glob(
        ["**/?(*).*", "**/*"],
        Object.assign(
            {
                onlyFiles: false
                //absolute: true,
            },
            options.globOptions,
            {
                cwd: path.resolve(options.cwd, appSrc)
            }
        )
    )
        .then(files => {
            files.forEach(file => {
                const absSrcFile = path.resolve(options.cwd, appSrc, file);
                const absDestFile = path.resolve(options.cwd, appDist, file);

                fs.copySync(absSrcFile, absDestFile);
            });
        })
        .catch(console.error);
};
