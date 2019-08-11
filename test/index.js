const transformEs = require("../lib/index");

main();

async function main() {
    await transformEs("test/src", "test/dest-node", {
        banner: "author: nobo.zhou",
        target: "node",
        defines: {
            "process.env.NODE_ENV": "production",
            "typeof window": "object"
        },
        resolve: {
            alias: {
                jquery: "./lib/jquery",
                react: "../verdion/react"
            }
        },
        ignore: /less|scss|css/
    });

    await transformEs("test/src", "test/dest-web", {
        banner: "author: nobo.zhou",
        //watch: true,
        target: "web",
        corejs: false,
        helpers: false,
        //loose: true,
        strictMode: false,
        modules: "umd",
        defines: {
            "process.env.NODE_ENV": "production",
            "typeof window": "object"
        },
        resolve: {
            alias: {
                $: "./lib/jquery",
                react: "../verdion/react"
            }
        },
        ignore: /less|css|scss/
    });

    await transformEs("test/src", "test/dist", {
        banner: `[name]\n[file]\nauthor: nobo.zhou`,
        minify: true,
        target: "web",
        //loose: true,
        ///modules: 'umd',
        log: false,
        defines: {
            "process.env.NODE_ENV": "production",
            "typeof window": "object"
        },
        ignore: /less|css|scss/
    });
}
