"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _set = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/set"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _class;

var path = require('path');

var fs = require("fs-extra");

var glob = require('fast-glob');

var MyApp = ta(_class =
/*#__PURE__*/
function () {
  function MyApp() {
    (0, _classCallCheck2.default)(this, MyApp);
    (0, _defineProperty2.default)(this, "title", 'test');
    (0, _defineProperty2.default)(this, "a", function () {});
  }

  (0, _createClass2.default)(MyApp, [{
    key: "say",
    value: function say() {}
  }]);
  return MyApp;
}()) || _class; //cst a = 4;


(0, _defineProperty2.default)(MyApp, "a", 3);

function test() {
  return _test.apply(this, arguments);
}

function _test() {
  _test = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var a;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return '23';

          case 2:
            a = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _test.apply(this, arguments);
}

test();
new _promise.default(function (r) {
  return r(1);
});
var x = new _set.default();

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
  options = (0, _assign.default)({}, defaults, options);

  if (options.cleanDist) {
    fs.emptyDirSync(path.resolve(options.cwd, appDist));
  }

  glob(["**/?(*).*", "**/*"], (0, _assign.default)({
    onlyFiles: false //absolute: true,

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