const transformEs = require('../lib/index');

transformEs('test/src', 'test/dest', {
    babelRuntimeHelpers: true,
    watch: true,
    target: 'web',
    //loose: true,
    ///modules: 'umd',
    ignore: /less|css|scss/
}); 