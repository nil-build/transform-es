


function cssWithMappingToString(item, useSourceMap) {
}


function toComment(sourceMap) {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
    var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

    return '/*# ' + data + ' */';
}

console.log(module);

// let a;
// let a;

module.exports = function (useSourceMap) {
    console.log(322)
};

function* foo() {
    yield 1;
    yield 1;
    yield 1;
    yield 1;
}