const gulp = require("gulp");
const path = require("path");
const execSync = require("child_process").execSync;
const fs = require("fs-extra");
const { isDir } = require("./utils");
const babelLoader = require("./loaders/babel");
const eslintLoader = require("./loaders/eslint");
const cssLoader = require("./loaders/css");
const log = require("./logger");

let hasInstall = false;

function hasInstallDeps() {
	if (hasInstall) return true;

	const pkgFile = process.cwd() + "/package.json";
	let pkg = {};
	if (fs.existsSync(pkgFile)) {
		pkg = require(pkgFile);
	}
	const allDeps = Object.assign({}, pkg.dependencies, pkg.devDependencies);

	hasInstall = "gulp-sass" in allDeps;

	return hasInstall;
}

function installDeps() {
	if (hasInstall) return;
	hasInstall = true;

	log("安装依赖 gulp-sass ...");
	cmd = `npm install --save-dev gulp-sass@4.0.2`;
	try {
		execSync(cmd);
	} catch (e) {
		log("依赖安装失败，请自行安装 gulp-sass");
		process.exit(0);
	}
	log("安装完成");
}

function checkFileIfNeedInstall(file) {
	return /\.scss$/.test(file);
}

module.exports = async function compile(file, options) {
	const ignore =
		options.ignore ||
		function() {
			return false;
		};
	const absPath = path.resolve(options.appSrc, file);
	const outFile = path.resolve(options.outDir, file);
	let outDir = options.outDir;

	if (isDir(absPath)) {
		await fs.ensureDir(outFile);
		return Promise.resolve(file);
	}

	// install node-sass check
	// if (checkFileIfNeedInstall(file) && !hasInstallDeps()) {
	// 	installDeps();
	// 	options._hasInstallScss = true;
	// }

	outDir = path.dirname(outFile);

	return new Promise(resolve => {
		let stream = gulp.src(absPath, {
			cwd: options.appSrc,
			allowEmpty: true,
		});

		if (!ignore(file)) {
			stream = eslintLoader(stream, options);
			stream = cssLoader(stream, options);
			stream = babelLoader(stream, options);
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
