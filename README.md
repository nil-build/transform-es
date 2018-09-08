# transform-es

对es6, scss, less, css进行转换，并输出到指定目录

## install

`npm install --save transform-es`

## cli

`transform-es src -d lib -t web -c -w`

- `-f, --outFile`
- `-d, --outDir` 默认 `lib`
- `-t, --target` 默认 `web`
- `-c, --clear` 
- `-w, --watch`
- `--ignore` eg: .css,.less 对匹配到的文件不进行复制和转换
- `--exclude` 对匹配到的文件进行复制，不转换

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
    babelRuntimeHelpers: true, // remove
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

