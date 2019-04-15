
let mod = require(`./mod`);
//输出的mod模块，是{"foo":"hello"}
console.log(`mod is ${JSON.stringify(mod)}`);
console.log(`mod[Symbol.for('bar')] is `+mod[Symbol.for('bar')]);

require(`./modify`);
//由于modify.js对global进行了修改，所以mod发生了变化。
console.log(`mod is ${JSON.stringify(mod)}`)
console.log(`mod[Symbol.for('bar')] is `+mod[Symbol.for('bar')]);