/*
const 用于声明制度常量，一旦声明，不能改变
*/

const PI = 3.1415;

console.log(PI);

//PI = 3.1415926;   //TypeError: Assignment to constant varible.

/*
const一旦声明变量，就必须立即初始化，不可留到以后赋值。
*/

//const foo;    //SyntaxError: Missing initializer in const declaration

/*
const命令与let命令相同，只在块级作用域内有效，
不允许变量提升，存在暂时性死区，不允许重复声明
*/

/*
const实际上保证的，并不是变量的值不得改动，
而是变量指向的内存地址保存的数据不得改动，
对于引用类型数据（对象，数组），变量指向的内存地址实际保存的是指向实际数据的指针，
const保证指针指向的地址是固定的，但是不能控制指向地址的数据的可变性。
*/

const arr = [];

arr.push('hello');
arr.push('world');

console.log(arr);
//arr = ["tian"];   //Assignment to constant variable.

/*
如果真的想对象冻结，应该使用Object.freeze方法
*/

const foo = Object.freeze([]);

//foo.push(123);  //Cannot add property 0, object is not extensible.
console.log(foo);

/*
ES6中一共有6中声明变量的方法，
分别是：var/function/let/const/import/class
var和function命令声明的全局变量，是顶层对象的属性
let和const，class命令声明的全局变量，不属于顶层对象的属性
从ES6开始，全局变量将逐步与顶层对象属性脱钩
*/

