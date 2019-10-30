const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const isFunction = require("lodash/isFunction");
const isRegExp = require("lodash/isRegExp");

const installDeps = require("./installDeps");
const log = require("./logger");
const error = chalk.bold.red;

function testFile(srcFile, item) {
    const reg = item.test;
    const fileName = path.basename(srcFile);

    if (isFunction(reg) && reg(fileName, srcFile)) {
        return true;
    }
    if (isRegExp(reg) && reg.test(fileName)) {
        return true;
    }

    return false;
}

async function resolveLoader(srcFile, targetFile, item, options) {
    const plugins = options.plugins;
    const handlers = item.use;

    const ext = path.extname(targetFile);
    const filename = path.basename(srcFile);
    const name = path.basename(targetFile, ext);
    const dir = path.dirname(targetFile);
    let outputFileName = name + ext;

    if (item.processor) {
        return await item.processor(srcFile, targetFile);
    }

    const input = {
        filename,
        file: srcFile,
        data: (await fs.readFile(srcFile)).toString()
    };
    try {
        for (let i = handlers.length; i > 0; i--) {
            const handler = handlers[i - 1];
            const loader = handler.loader;
            await installDeps(loader, options.cnpm);
            let result = await loader(input, handler.options, options);
            if (result !== undefined) {
                input.data = result;
            }
        }

        if (item.output) {
            outputFileName = item.output({
                ext,
                name
            });
        }

        input.name = outputFileName;

        for (let i = 0; i < plugins.length; i++) {
            const plugin = plugins[i];
            let result = await plugin(input, options);
            if (result !== undefined) {
                input.data = result;
            }
        }

        return fs.outputFile(path.resolve(dir, outputFileName), input.data);
    } catch (e) {
        log(error(srcFile), e);
    }
}

module.exports = async function(srcFile, targetFile, options) {
    for (let i = 0; i < options.loaders.length; i++) {
        const loader = options.loaders[i];

        if (testFile(srcFile, loader)) {
            await resolveLoader(srcFile, targetFile, loader, options);
            break;
        }
    }
};
