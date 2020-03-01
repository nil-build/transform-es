const gulpif = require("gulp-if");
const babel = require("gulp-babel");
const { handleError } = require("../utils");
const getBabelConfig = require("../config/babel.config");

function isJavaScriptFile(file) {
	return /\.(js|mjs|jsx|ts|tsx)$/.test(file.extname);
}

module.exports = function(stream, options) {
	return stream
		.pipe(gulpif(isJavaScriptFile, babel(getBabelConfig(options.babel))))
		.on("error", function(err) {
			handleError.call(this, err, "JavaScript");
		});
};
