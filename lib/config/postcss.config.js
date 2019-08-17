const autoprefixer = require("autoprefixer");

module.exports = function({ browserslist }) {
    return {
        plugins: [
            require("postcss-flexbugs-fixes"),
            autoprefixer({
                browsers: browserslist,
                flexbox: "no-2009"
            })
        ]
    };
};
