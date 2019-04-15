
let mod = require("./mod");
//但是，全局变量global是可写的，任何文件都可以修改
mod.foo="world";
mod[Symbol.for('bar')]="world2";
//执行了修改之后，会使得输出的mod模块失真。
module.export = mod;