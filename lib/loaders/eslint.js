const gulpif = require("gulp-if");
const eslint = require("gulp-eslint");
const log = require("../logger");

function isJavaScriptFile(file) {
    return /m?jsx?$/.test(file.extname);
}

function isTypeScriptFile(file) {
    if (/\.d\.ts$/.test(file.basename)) {
        return false;
    }
    return /\.tsx?$/.test(file.basename);
}

function getESLintConfig(options, isTS) {
    const config = {
        baseConfig: require("../config/eslint.config.js"),
        useEslintrc: true,
        ...options.eslint
    };

    if (isTS) {
        config.parser = "@typescript-eslint/parser";
    }

    return config;
}

module.exports = function(stream, options) {
    return stream
        .pipe(gulpif(isJavaScriptFile, eslint(getESLintConfig(options))))
        .pipe(gulpif(isTypeScriptFile, eslint(getESLintConfig(options, true))))
        .pipe(
            eslint.format(null, message => {
                log.save(`\nESLint:${message}`);
            })
        );
};
