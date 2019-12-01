const path = require("path");
const fs = require("fs-extra");
const gulpif = require("gulp-if");
const ts = require("gulp-typescript");

const { handleError } = require("../utils");

function getCompilerOptions(options) {
    let customizeConfig = {};
    const configPath = path.join(options.cwd, "tsconfig.json");
    if (fs.existsSync(configPath)) {
        customizeConfig = require(configPath) || {};
    }
    return {
        ...options.typescript,
        ...customizeConfig
    };
}

function isTypeScriptFile(file) {
    if (/\.d\.ts$/.test(file.basename)) {
        return false;
    }
    return /\.tsx?$/.test(file.basename);
}

module.exports = function compiler(stream, options) {
    return stream
        .pipe(gulpif(isTypeScriptFile, ts(getCompilerOptions(options))))
        .on("error", handleError);
};
