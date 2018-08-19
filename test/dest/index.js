'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class;

//cst a = 4;


var test = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var a;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return '23';

                    case 2:
                        a = _context.sent;

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function test() {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var path = require('path');
var fs = require("fs-extra");
var glob = require('fast-glob');

var MyApp = (_class = function () {
    function MyApp() {
        (0, _classCallCheck3.default)(this, MyApp);
        this.title = 'test';

        this.a = function () {};
    }

    (0, _createClass3.default)(MyApp, [{
        key: 'say',
        value: function say() {}
    }]);
    return MyApp;
}(), (_applyDecoratedDescriptor(_class.prototype, 'say', [ta], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'say'), _class.prototype)), _class);
MyApp.a = 3;


test();

new _promise2.default(function (r) {
    return r(1);
});

var x = new _set2.default();

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