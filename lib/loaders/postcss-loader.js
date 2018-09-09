
function postcssLoader(input, options) {
    const postcss = require('postcss');
    const postcssConfig = require('../config/postcss.config');
    const config = options.postcssConfig || postcssConfig();

    return postcss(config.plugins).process(input.data, {
        from: input.file
    }).then(result => {
        return result.css;
    });
}

postcssLoader.deps = [];
postcssLoader.devDeps = ['postcss', 'autoprefixer', 'postcss-flexbugs-fixes'];

module.exports = postcssLoader;