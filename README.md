# transform-es

对es6, scss, less, css进行转换，并输出到指定目录, 目的在于减少平常写脚本时的配置时间

## install

`npm install --save-dev transform-es`

## cli

> `transform-es src -d lib -t web -c -w`
>
>`transform-es src -d lib -t web -c -w --cnpm --corejs false --loose --modules amd`

- `-f, --outFile` 输出到文件，只有单文件转换有效
- `-d, --outDir` 输出到指定目录，默认为 lib
- `-t, --target` 转换目标格式：web | node 默认为 web
- `-c, --clear`  转换前清空输出目录
- `-w, --watch` 是否监控文件改变
- `--ignore` 对匹配成功的文件不进行转换和复制 eg: .css,.less 
- `--exclude` 对匹配成功的文件后只复制不转换 eg: .css,.less 
- `--modules` 参考 babel  "amd" | "umd" | "systemjs" | "commonjs" | "cjs" |  false 默认 commonjs
- `--loose` 参考 babel
- `--corejs` true | false  参考 babel-runtime
- `--helpers` true | false 参考 babel-runtime
- `--cnpm` 使用使用cnpm进行安装依赖，国内环境



## api

```
transformEs( src, dest, options );
```

## options

```
 {
    cwd: cwd, //当前工作路径
    glob: ["**/?(*).*", "**/*"],
    globOptions: {},
    cleanDest: true,
    babelConfig: null, // {...}
    exclude: null,
    ignore: null,
    watch: false,
    watchOptions: {},
    target: 'web',// node web
    //babelRuntimeHelpers: true, // remove
    modules: "commonjs",// "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | false
    loose: false,
    cnpm: false,
    babelRuntimeOptons: {
        corejs: 2, // [2]target=web [false]target=node  
        helpers: true,
        regenerator: true,
    }
}
```

## examples 

```
const transformEs = require('transform-es');

transformEs('src', 'lib', {
    watch: true
});

```

