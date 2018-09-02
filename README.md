# transform-es

将es6转成node.js下可执行的语法

## install

`npm install --save transform-es`

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
    target: 'node',// node web
    babelRuntimeHelpers: true, // remove
    babelRuntimeOptons: {
        corejs: 2, // [2]target=web [false]target=node  
        helpers: true,
        regenerator: true,
    }
}
```

## api

```
transformEs( src, dest, options );
```

## examples 

```
const transformEs = require('transform-es');

transformEs('src', 'dest', {
    watch: true
});

```