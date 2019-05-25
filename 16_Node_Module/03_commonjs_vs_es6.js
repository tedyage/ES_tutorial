/*
ES6模块与CommonJS模块的差异
*/

//1.CommonJS加载的是模块输出值的复制；ES6加载的是模块输出值的引用
//2.CommonJS是在运行时加载模块；ES6是在编译时输出接口。

//第一个差异，请看引用lib01.js
const lib01 = require("./assets/lib01");

console.log(lib01.counter);       //3
lib01.incounter();                //执行lib01的incounter方法
console.log(lib01.counter);       //3
/*
lib01内部在执行了incounter方法之后，counter变量自增了1，
但是不会影响到lib01.counter，这是因为counter是一个原始类型变量，会被缓存。
*/
console.log(lib01.getCounter());     //4
//如果想获取counter正确的值，可以将返回counter值的方法作为输出。

console.log(lib01.counterObj);      //{foo:"hello"}
lib01.modifyCounterObj();
console.log(lib01.counterObj);      //{foo:"hello world"}
/*
这是因为counterObj是个引用类型，所以缓存中存的是counterObj的地址，
所以引用类型内部内容的改变，会被输出到外部
*/

import {counter,incounter} from './assets/lib02'
console.log(counter);         //3
incounter();
console.log(counter);         //4
/*
ES6模块输入的变量counter是活的，
不存在缓存的结果
完全可以反应所在模块lib.js内部的变化
*/




