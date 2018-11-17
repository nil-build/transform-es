const path = require('path');
const fs = require("fs-extra");
const chalk = require('chalk');

const installDeps = require('./installDeps');
const log = require('./logger');
const error = chalk.bold.red;

async function resolveLoader(srcFile, targetFile, item, options) {
    const reg = item.test;

    if (!reg.test(srcFile)) {
        return;
    }

    const plugins = options.plugins;
    const handlers = Array.isArray(item.loader) ? item.loader : [item.loader];

    const ext = path.extname(targetFile);
    const fileanme = path.basename(srcFile);
    const name = path.basename(targetFile, ext);
    const dir = path.dirname(targetFile);
    let outputFileName = name + ext;

    const input = {
        fileanme,
        file: srcFile,
        data: (await fs.readFile(srcFile)).toString(),
    };
    try {
        for (let i = handlers.length; i > 0; i--) {
            const hander = handlers[i - 1];
            await installDeps(hander, options.cnpm);
            let result = await hander(input, options, item);
            if (result !== undefined) {
                input.data = result;
            }
        }

        if (item.output) {
            outputFileName = item.output({
                ext,
                name,
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

        // fs.outputFileSync(path.resolve(dir, outputFileName), input.data);

        return fs.outputFile(path.resolve(dir, outputFileName), input.data);

    } catch (e) {
        log(error(srcFile), e);
    }
}

module.exports = async function (srcFile, targetFile, options) {
    for (let i = 0; i < options.loaders.length; i++) {
        await resolveLoader(srcFile, targetFile, options.loaders[i], options);
    }
}