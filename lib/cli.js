#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const transformEs = require('./index');

program
    .version(pkg.version)
    .option('-w, --watch', '是否监控文件改变', true)
    .option('-f, --outFile <outFile>', '输出到文件，只有单文件转换有效')
    .option('-d, --outDir [outDir]', '输出到指定目录，默认为 lib', 'lib')
    .option('-t, --target [target]', '转换目标格式：web | node 默认为 web', /^node|web$/, 'web')
    .option('-c, --clear', '转换前清空输出目录', true)
    .option('-m, --minify', '压缩JS,SCSS,LESS,CSS文件', true)
    .option('--banner [banner]', '在每个转换文件顶部添加注释文本', '')
    .option('--ignore <ignore>', '对匹配成功的文件不进行转换和复制')
    .option('--exclude <excluede>', '对匹配成功的文件后只复制不转换')
    .option('--modules <modules>', '参考 babel', /^amd|umd|systemjs|commonjs|cjs|false$/, 'commonjs')
    .option('--loose', '参考 babel', true)
    .option('--useBuiltIns [useBuiltIns]', '参考 babel', /^usage|entry|false$/, 'false')
    .option('--cnpm', '使用cnpm安装依赖', true)
    .option('--corejs [corejs]', '参考 babel-runtime', true)
    .option('--helpers [helpers]', '参考 babel-runtime', true)
    .option('--regenerator [regenerator]', '参考 babel-runtime', true)
    .parse(process.argv);

const options = {
    minify: !!program.minify,
    banner: program.banner,
    watch: !!program.watch,
    target: program.target,
    cleanDest: !!program.clear,
    loose: !!program.loose,
    cnpm: !!program.cnpm,
    modules: program.modules === 'false' ? false : program.modules,
    useBuiltIns: program.useBuiltIns === 'false' ? false : program.useBuiltIns,
    ignore: program.ignore ? program.ignore.split(',').map(reg => new RegExp(reg)) : null,
    exclude: program.exclude ? program.exclude.split(',').map(reg => new RegExp(reg)) : null,
    babelRuntimeOptions: {
        corejs: program.corejs === 'false' ? false : 2,
        helpers: program.helpers === 'false' ? false : true,
        regenerator: program.regenerator === 'false' ? false : true,
    }
};

console.log(options);

let src = 'src';

if (program.args.length) src = program.args[0];

transformEs(src, program.outFile || program.outDir, options);