const gulpif = require("gulp-if");
const eslint = require("gulp-eslint");
const log = require("../logger");

function isJavaScriptFile(file) {
    return /m?jsx?$/.test(file.extname);
}

function getESLintConfig(options) {
    return {
        baseConfig: require("../config/eslint.config.js"),
        useEslintrc: true,
        ...options.eslint
    };
}

module.exports = function(stream, options) {
    return stream
        .pipe(gulpif(isJavaScriptFile, eslint(getESLintConfig(options))))
        .pipe(eslint.format(null, log.save));
};
