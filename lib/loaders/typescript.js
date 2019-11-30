const path = require("path");
const fs = require("fs-extra");
const gulpif = require("gulp-if");
const ts = require("gulp-typescript");

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
    return file.extname === ".ts" || file.extname === ".tsx";
}

module.exports = function compiler(stream, options) {
    return stream
        .pipe(gulpif(isTypeScriptFile, ts(getCompilerOptions(options))))
        .on("error", function(err) {
            console.log(err.message);
            this.emit("end");
        });
};
