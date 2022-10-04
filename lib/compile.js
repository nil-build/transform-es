const gulp = require("gulp");
const path = require("path");
const fs = require("fs-extra");
const { isDir } = require("./utils");
const babelLoader = require("./loaders/babel");
const cssLoader = require("./loaders/css");
const rawLoader = require("./loaders/raw");

module.exports = async function compile(file, options) {
	const ignore =
		options.ignore ||
		function () {
			return false;
		};
	const absPath = path.resolve(options.appSrc, file);
	const outFile = path.resolve(options.outDir, file);
	let outDir = options.outDir;

	if (isDir(absPath)) {
		await fs.ensureDir(outFile);
		return Promise.resolve(file);
	}

	outDir = path.dirname(outFile);

	const meta = {
		outDir,
		outFile,
		filePath: file,
	};

	return new Promise(resolve => {
		let stream = gulp.src(absPath, {
			cwd: options.appSrc,
			allowEmpty: true,
		});

		if (!ignore(file)) {
			stream = cssLoader(stream, options, meta);
			stream = rawLoader(stream, options, meta);
			stream = babelLoader(stream, options, meta);
			if (options.transform) {
				stream = transform(stream, options, meta);
			}
		}
		stream = stream.pipe(gulp.dest(outDir));

		stream.on("finish", () => {
			resolve(file);
		});
		stream.on("error", () => {
			resolve(file);
		});
	});
};
