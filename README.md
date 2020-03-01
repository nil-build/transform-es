# transform-es

对 ts, es6, scss, less, css 进行转换，并输出到指定目录

## install & usage

`npm install --save-dev transform-es`

`npx transform-es init`

`npx transform-es src`

## cli

> `transform-es src -d lib -t esm -c -w`
>
> `transform-es src -d lib -t web -c -w [-m]`

> `transform-es src -d lib -t node -c -w`

-   `-f, --outFile` 输出到文件，只有单文件转换有效
-   `-d, --outDir` 输出到指定目录，默认为 lib
-   `-c, --clean` 转换前清空输出目录
-   `-w, --watch` 是否监控文件改变
-   `-t, --target` 指定输出目标： node|web|esm|cjs|commonjs|amd|umd|systemjs|auto 默认`web`
-   `--config` 配置文件 默认： `transform-es.config.js`
-   `--state` 传递给 transform-es.config.js 的数据

### transform-es.config.js

```js
module.exports = function(options, state) {
	return {
		babel: {
			//...babel options
			decoratorsBeforeExport: true,
			strictMode: true,
			useFlow: true,
			loose: true,
			runtimeOptions: {},
			presets: [],
			plugins: [],
		},
		eslint: {},
		postcss: {},
		//compilerOptions
		typescript: {},
	};
};
```

## api

```
transformEs( src, dest, options );
```

## options

```
 {
        glob: ["**/*", "**/*.*", "**/.*"],
        clean: true, //转换前清空输出目录
        watch: false,
        ignore: null, // file => boolean
        filter: null,// file => boolean
        babel: {
            decoratorsBeforeExport: true,
            strictMode: true,
            useFlow: true,
            loose: true,
            runtimeOptions: {},
            presets: [],
            plugins: [],
            ...presetOptions
        },
        eslint: {},
        postcss: {},
    }
```

## examples

```
const transformEs = require('transform-es');

transformEs('src', 'lib', {
    watch: true
});

```
