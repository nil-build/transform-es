var program = require('commander');


// program
//     .version('0.1.0')
//     .option('-s --size <size>', 'Pizza size', /^(large|medium|small)$/i, 'medium')
//     .option('-d --drink [drink]', 'Drink', /^(coke|pepsi|izze)$/i)
//     .parse(process.argv);

// console.log(' size: %j', program.size);
// console.log(' drink: %j', program.drink);

program
    .version('0.1.0')
    .option('-w, --watch', 'watch compile dir', true)
    .option('-f, --file <file>', 'compile file')
    .option('-d, --dir [dir]', 'compile dir', 'src')
    .option('-t, --target [target]', 'compile target', /^node|web$/, 'web')
    .option('-c, --clear-dir', 'clear dir before compile', true)
    .parse(process.argv);

console.log(program.target)
console.log(program.watch)
console.log(program.file)

console.log(program);