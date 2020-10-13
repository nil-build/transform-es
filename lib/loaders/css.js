const gulpif = require("gulp-if");
const PluginError = require("plugin-error");
const less = require("gulp-less");
const scss = require("gulp-dart-scss");
const postcss = require("gulp-postcss");
const path = require("path");
const rename = require("gulp-rename");
const cssModules = require("postcss-modules");
const fs = require("fs-extra");
const log = require("../logger");
const { handleError } = require("../utils");

function isScssFile(file) {
	return file.extname === ".scss";
}
function isLessFile(file) {
	return file.extname === ".less";
}

function isCssFile(file) {
	return file.extname === ".css" || isScssFile(file) || isLessFile(file);
}

function isModuleCssFile(file) {
	return /module\.(:?css|less|scss)$/.test(file.path);
}

function handleSassError(error) {
	const message = new PluginError("sass", error.messageFormatted).toString();
	log.save(`Scss:\n${message}\n`);
}

module.exports = function (stream, options, meta) {
	const postcssConfig = require("../config/postcss.config");
	const config = postcssConfig(options.postcss);

	if (isModuleCssFile({ path: meta.filePath })) {
		config.plugins.push(
			cssModules({
				getJSON: function (_, json) {
					const fileName = path.basename(meta.outFile) + ".css";
					fs.writeFile(
						meta.outFile + ".js",
						`require('./${fileName}');module.exports = ${JSON.stringify(json)};`
					).catch(console.log);
				},
			})
		);
	}

	return stream
		.pipe(gulpif(isScssFile, scss({}).on("error", handleSassError)))
		.on("error", function () {
			this.emit("end");
		})
		.pipe(gulpif(isLessFile, less()))
		.on("error", function (err) {
			handleError.call(this, err, "Less");
		})
		.pipe(gulpif(isCssFile, postcss(config.plugins)))
		.on("error", function (err) {
			handleError.call(this, err, "PostCSS");
		})
		.pipe(
			gulpif(
				isModuleCssFile,
				rename({
					extname: path.extname(meta.outFile) + ".css",
				})
			)
		);
};
