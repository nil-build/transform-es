const transformEs = require('../lib/index');

transformEs('test/src', 'test/dest', {
    babelRuntimeHelpers: true,
    watch: true,
    target: 'web',
    ignore: /less|css|scss/
}); 