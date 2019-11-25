const transformEs = require("../lib/index");

main();

function main() {
    transformEs("test/src", "test/dest-node", {
        banner: "author: nobo.zhou",
        babelOptions: {
            targets: {
                node: "current"
            }
        },
        ignore: /less|scss|css/
    });

    transformEs("test/src", "test/dest-web-esm", {
        banner: "author: nobo.zhou",
        babelOptions: {
            loose: true,
            modules: false
        },
        ignore: /less|css|scss/
    });

    transformEs("test/src", "test/dest-web-cjs", {
        banner: "author: nobo.zhou",
        babelOptions: {
            useBuiltIns: "usage",
            corejs: 3,
            loose: true,
            modules: "commonjs"
        },
        ignore: /less|css|scss/
    });

    transformEs("test/src", "test/dist", {
        banner: `[name]\n[file]\nauthor: nobo.zhou`,

        log: false,
        babelOptions: {
            loose: true,
            minify: true
        },
        ignore: /less|css|scss/
    });
}
