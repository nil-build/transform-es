const path = require('path');

function lessLoader(input, options) {
    const less = require('less');

    return less.render(input.data, Object.assign({}, options.lessConfig, {
        paths: [path.dirname(input.file)]
    })).then(result => {
        return result.css;
    });
}

lessLoader.deps = [];
lessLoader.devDeps = ['less'];

module.exports = lessLoader;