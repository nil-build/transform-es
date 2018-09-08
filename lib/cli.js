#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json');
var transformEs = require('./index');

program
    .version(pkg.version)
    .option('-w, --watch', '是否监控文件改变', true)
    .option('-f, --outFile <outFile>', '转换后的输出文件')
    .option('-d, --outDir [outDir]', '转换好输出到指定目录，默认为 lib', 'lib')
    .option('-t, --target [target]', '输出目标：[默认]web或node', /^node|web$/, 'web')
    .option('-c, --clear', '启动转换后情况目标目录', true)
    .option('--ignore <ignore>', '匹配成功后不对文件转换和复制')
    .option('--exclude <excluede>', '匹配成功后只复制，不转换')
    .parse(process.argv);

var options = {
    watch: !!program.watch,
    target: program.target,
    cleanDest: !!program.clear,
    ignore: program.ignore ? program.ignore.split(',').map(reg => new RegExp(reg)) : null,
    exclude: program.exclude ? program.exclude.split(',').map(reg => new RegExp(reg)) : null,
};

var src = 'src';

if (program.args.length) src = program.args[0];

transformEs(src, program.outFile || program.outDir, options);