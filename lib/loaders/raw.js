const gulpif = require("gulp-if");
const path = require("path");
const through2 = require("through2");
const rename = require("gulp-rename");
const { handleError } = require("../utils");

function raw(opts) {
	return through2.obj(function (file, _, cb) {
		if (file.isBuffer()) {
			let content = file.contents.toString();
			content = `export default ${JSON.stringify(content)};`;
			file.contents = Buffer.from(content);
		}

		cb(null, file);
	});
}

module.exports = function (stream, options, meta) {
	// let esModule = true;
	let useRaw = false;

	// if (options.raw && "esModule" in options.raw) {
	// 	esModule = options.raw.esModule;
	// }

	if (options.raw && options.raw.test && options.raw.test.test(meta.filePath)) {
		useRaw = true;
	}

	return stream
		.pipe(
			gulpif(
				() => useRaw,
				raw({
					// esModule,
				})
			)
		)
		.on("error", function (err) {
			handleError.call(this, err, "RAW");
		})
		.pipe(
			gulpif(
				() => useRaw,
				rename({
					extname: path.extname(meta.outFile) + ".js",
				})
			)
		);
};
