const path = require("path");

function sassLoader(input, options) {
    return new Promise((resolve, reject) => {
        const sass = require("node-sass");

        sass.render(
            Object.assign({}, options, {
                data: input.data,
                includePaths: [path.dirname(input.file)]
            }),
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.css);
                }
            }
        );
    });

    // return result.css;
}

sassLoader.deps = [];
sassLoader.devDeps = ["node-sass"];

module.exports = sassLoader;
