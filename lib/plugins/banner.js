const isFunction = require('lodash.isfunction');

const COMMENT_END_REGEX = /\*\//g;
const wrapComment = str => {
    if (!str) return "";
    if (!str.includes("\n")) {
        return `/*! ${str.replace(COMMENT_END_REGEX, "* /")} */`;
    }
    return `/*!\n * ${str
        .replace(/\*\//g, "* /")
        .split("\n")
        .join("\n * ")}\n */`;
};

module.exports = function (input, options) {
    let comment = options.banner;
    if (isFunction(comment)) {
        comment = comment(input);
    }

    comment = wrapComment(comment)
        .replace(/\[name\]/g, input.name)
        .replace(/\[file\]/g, input.file.replace(options.cwd, ''))

    return `${comment}\n${input.data}`;
}