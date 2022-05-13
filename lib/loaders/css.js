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
const through2 = require("through2");

function generateCssJS({ meta }) {
	return through2.obj(function (file, _, cb) {
		const fileName = path.basename(meta.outFile, path.extname(meta.outFile)) + ".css";

		fs.writeFile(meta.outFile + ".js", `"use strict";require('./${fileName}');`)
			.then(() => {
				cb(null, file);
			})
			.catch(e => cb(e));
	});
}

function isScssFile(file) {
	return file.extname === ".scss";
}
function isLessFile(file) {
	return file.extname === ".less";
}

function isCssFile(file) {
	return file.extname === ".css" || isScssFile(file) || isLessFile(file);
}

function handleSassError(error) {
	const message = new PluginError("sass", error.messageFormatted).toString();
	log.save(`Scss:\n${message}\n`);
}

module.exports = function (stream, options, meta) {
	const postcssConfig = require("../config/postcss.config");
	const config = postcssConfig(options.postcss);

	let isCssModule = false;
	let esModule = true;

	if (options.cssModule && "esModule" in options.cssModule) {
		esModule = options.cssModule.esModule;
	}

	if (options.cssModule && options.cssModule.test && options.cssModule.test.test(meta.filePath)) {
		isCssModule = true;
	}

	if (isCssModule) {
		config.plugins.push(
			cssModules({
				getJSON: function (_, json) {
					const fileName = path.basename(meta.outFile) + ".css";

					let header = `"use strict";require('./${fileName}');${
						esModule
							? 'exports.__esModule = true;exports["default"]='
							: "module.exports="
					}`;

					if (options.babel && options.babel.modules === false) {
						header = `import "./${fileName}"; export default `;
					}

					fs.writeFile(meta.outFile + ".js", header + JSON.stringify(json)).catch(
						console.log
					);
				},
			})
		);
	}

	return stream
		.pipe(gulpif(isScssFile, scss(options.scss || {}).on("error", handleSassError)))
		.on("error", function () {
			this.emit("end");
		})
		.pipe(gulpif(isLessFile, less(options.less || {})))
		.on("error", function (err) {
			handleError.call(this, err, "Less");
		})
		.pipe(gulpif(isCssFile, postcss(config.plugins)))
		.on("error", function (err) {
			handleError.call(this, err, "PostCSS");
		})
		.pipe(
			gulpif(
				file => isCssFile(file) && !isCssModule,
				generateCssJS({
					meta,
					esModule,
				})
			)
		)
		.pipe(
			gulpif(
				() => isCssModule,
				rename({
					extname: path.extname(meta.outFile) + ".css",
				})
			)
		);
};
