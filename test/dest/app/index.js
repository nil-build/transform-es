'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var fs = require("fs-extra");
var glob = require('fast-glob');

module.exports = function () {
    var appSrc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'src';
    var appDist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dest';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var defaults = {
        cwd: process.cwd(),
        cleanDist: true,
        globOptions: {}
    };

    appSrc = appSrc || '.';

    options = (0, _extends3.default)({}, defaults, options);

    if (options.cleanDist) {
        fs.emptyDirSync(path.resolve(options.cwd, appDist));
    }

    glob(["**/?(*).*", "**/*"], (0, _extends3.default)({
        onlyFiles: false
        //absolute: true,
    }, options.globOptions, {
        cwd: path.resolve(options.cwd, appSrc)
    })).then(function (files) {
        files.forEach(function (file) {
            var absSrcFile = path.resolve(options.cwd, appSrc, file);
            var absDestFile = path.resolve(options.cwd, appDist, file);

            fs.copySync(absSrcFile, absDestFile);
        });
    }).catch(console.error);
};