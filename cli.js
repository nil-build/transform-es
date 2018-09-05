#!/usr/bin/env node

var program = require('commander');
var pkg = require('./package.json');
var transformEs = require('./index');

program
    .version(pkg.version)
    .option('-w, --watch', 'watch compile dir', true)
    .option('-o, --outFile <outFile>', 'compile file')
    .option('-d, --outDir [outDir]', 'compile dir', 'lib')
    .option('-t, --target [target]', 'compile target', /^node|web$/, 'web')
    .option('-c, --clear', 'clear dir before compile', true)
    .parse(process.argv);

var options = {
    watch: !!program.watch,
    target: program.target,
    cleanDest: !!program.clear,
};

var src = 'src';

if (program.args.length) src = program.args[0];

transformEs(src, program.outFile || program.outDir, options);