const path = require("path");
const fs = require("fs-extra");
const gulpif = require("gulp-if");
const ts = require("gulp-typescript");
const colors = require("ansi-colors");
const log = require("../logger");

function getCompilerOptions(options) {
    let customizeConfig = {};
    const configPath = path.join(options.cwd, "tsconfig.json");
    if (fs.existsSync(configPath)) {
        customizeConfig = require(configPath) || {};
    }
    return {
        declaration: true,
        module: "esnext",
        target: "es2016",
        lib: ["es6", "dom"],
        jsx: "react",
        allowSyntheticDefaultImports: true,
        moduleResolution: "node",
        forceConsistentCasingInFileNames: true,
        noImplicitReturns: true,
        suppressImplicitAnyIndexErrors: true,
        allowJs: false,
        noImplicitThis: false,
        experimentalDecorators: true,
        ...options.typescript,
        ...customizeConfig.compilerOptions
    };
}

function isTypeScriptFile(file) {
    if (/\.d\.ts$/.test(file.basename)) {
        return false;
    }
    return /\.tsx?$/.test(file.basename);
}

const defaultReporter = ts.reporter.fullReporter();
const fullFilename = true;
defaultReporter.error = function(error, typescript) {
    if (error.tsFile) {
        log.save(
            "> " +
                colors.gray("file: ") +
                (fullFilename ? error.fullFilename : error.relativeFilename) +
                colors.red(
                    "(" +
                        error.startPosition.line +
                        "," +
                        error.startPosition.character +
                        "): "
                ) +
                colors.gray(":")
        );
        const lines = error.tsFile.text.split(/(?:\r\n|\r|\n)/);
        const logLine = (lineIndex, errorStart, errorEnd) => {
            const line = lines[lineIndex];
            if (errorEnd === undefined) errorEnd = line.length;
            log.save(
                colors.red("> " + ("line: " + (lineIndex + 1) + "")) +
                    line.substring(0, errorStart) +
                    colors.red(line.substring(errorStart, errorEnd)) +
                    line.substring(errorEnd)
            );
        };
        for (
            let i = error.startPosition.line;
            i <= error.endPosition.line;
            i++
        ) {
            logLine(
                i,
                i === error.startPosition.line
                    ? error.startPosition.character
                    : 0,
                i === error.endPosition.line
                    ? error.endPosition.character
                    : undefined
            );
        }

        log.save(
            "> " +
                colors.red(error.diagnostic.code + "") +
                " " +
                colors.red(
                    typescript.flattenDiagnosticMessageText(
                        error.diagnostic.messageText,
                        "\n"
                    )
                )
        );
    }
};

module.exports = function compiler(stream, options) {
    return stream
        .pipe(
            gulpif(
                isTypeScriptFile,
                ts(getCompilerOptions(options), defaultReporter)
            )
        )
        .on("error", function(err) {
            this.emit("end");
            //ignore error
        });
};
