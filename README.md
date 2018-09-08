# transform-es

将es6转成node.js下可执行的语法

## install

`npm install --save transform-es`

## cli

`transform-es src -d lib -t web -c -w`

- `-f, --outFile`
- `-d, --outDir` 默认 `lib`
- `-t, --target` 默认 `web`
- `-c, --clear` 
- `-w, --watch`

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
    include: /\.js$/,
    exclude: null,
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

