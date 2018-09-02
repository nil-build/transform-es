"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _class;

const path = require('path');

const fs = require("fs-extra");

const glob = require('fast-glob');

let MyApp = ta(_class = class MyApp {
  constructor() {
    (0, _defineProperty2.default)(this, "title", 'test');
    (0, _defineProperty2.default)(this, "a", () => {});
  }

  say() {}

}) || _class; //cst a = 4;


(0, _defineProperty2.default)(MyApp, "a", 3);

async function test() {
  const a = await '23';
}

test();
new Promise(r => r(1));
const x = new Set();

module.exports = function (appSrc = 'src', appDist = 'dest', options = {}) {
  const defaults = {
    cwd: process.cwd(),
    cleanDist: true,
    globOptions: {}
  };
  appSrc = appSrc || '.';
  options = Object.assign({}, defaults, options);

  if (options.cleanDist) {
    fs.emptyDirSync(path.resolve(options.cwd, appDist));
  }

  glob(["**/?(*).*", "**/*"], Object.assign({
    onlyFiles: false //absolute: true,

  }, options.globOptions, {
    cwd: path.resolve(options.cwd, appSrc)
  })).then(files => {
    files.forEach(file => {
      const absSrcFile = path.resolve(options.cwd, appSrc, file);
      const absDestFile = path.resolve(options.cwd, appDist, file);
      fs.copySync(absSrcFile, absDestFile);
    });
  }).catch(console.error);
};