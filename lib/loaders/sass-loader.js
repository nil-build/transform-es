const fs = require("fs-extra");
const path = require('path');
const execSync = require('child_process').execSync;

function sassLoader(input, options) {

    const sass = require('node-sass');

    const result = sass.renderSync(Object.assign({}, options.sassConfig, {
        data: input.data,
        includePaths: [path.dirname(input.file)]
    }));

    return result.css;
}

sassLoader.deps = [];
sassLoader.devDeps = ['node-sass'];

module.exports = sassLoader