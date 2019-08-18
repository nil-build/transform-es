# transform-es

对 es6, scss, less, css 进行转换，并输出到指定目录, 目的在于减少平常写脚本时的配置时间

## install & usage

`npm install --save-dev transform-es`

`npx transform-es init`

`npx transform-es src`

## cli

> `transform-es src -d lib -t web -c -w`
>
> `transform-es src -d lib -t web -c -w --cnpm --corejs false --loose --modules amd`

-   `-f, --outFile` 输出到文件，只有单文件转换有效
-   `-d, --outDir` 输出到指定目录，默认为 lib
-   `-c, --clear` 转换前清空输出目录
-   `-w, --watch` 是否监控文件改变
-   `-t, --target` 指定输出目标： web|node 默认`web`, 如果为 web 时会搜索 browserslist，为 node 时则不搜索，使用 targets.node = current
-   `-m, --minify` 压缩 JS,SCSS,LESS,CSS 文件
-   `--log` 输出日志 true | false
-   `--config` 配置文件 默认： `transform-es.config.js`
-   `--mode` 转换模式：`none（默认值）、development或production`，production 模式下`minify生效`
-   `--banner` 在每个转换文件顶部添加注释文本
-   `--ignore` 对匹配成功的文件不进行转换和复制 eg: .css,.less
-   `--exclude` 对匹配成功的文件后只复制不转换 eg: .css,.less
-   `--cnpm` 使用使用 cnpm 进行安装依赖，国内环境

## api

```
transformEs( src, dest, options );
```

## options

```
 {
        glob: ["**/?(*).*", "**/*"],
        globOptions: {},
        //转换模式：none（默认值）、development或production，production模式下minify生效
        mode: "none",
        cleanDest: true, //转换前清空输出目录
        //文件不进行编译，但会复制
        exclude: null,
        //文件不进行编译，也不会复制
        ignore: null,
        watch: false,
        watchOptions: {},
        cnpm: false,
        minify: false,
        log: true,
        taskRunner: 15,
        // browserslist,
        babelOptions: {
            decoratorsBeforeExport: true,
            strictMode: true,
            useFlow: true,
            minify: !!options.minify,
            minifyOptions: {},
            runtimeOptions: {},
            presets: [],
            plugins: [],
            ...presetOptions
        },
        postcssOptions: {},
        scssOptions: {},
        lessOptions: {},
        banner: null // string function
    }
```

## examples

```
const transformEs = require('transform-es');

transformEs('src', 'lib', {
    watch: true
});

```
