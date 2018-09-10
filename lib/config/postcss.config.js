const browserslist = require('./browserslist.config');
const autoprefixer = require('autoprefixer');

module.exports = function ({ browsers }) {
    return {
        plugins: [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
                browsers: browsers || browserslist,
                flexbox: 'no-2009',
            }),
        ]
    };
}