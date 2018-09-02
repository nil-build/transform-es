const transformEs = require('../index');

transformEs('test/src', 'test/dest', {
    babelRuntimeHelpers: true,
    watch: true,
    target: 'node'
}); 