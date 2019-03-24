/*----------------let命令------------------*/
/*
ES6新增了let命令，用来声明变量。
它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效
*/
{
    let a = 10;     //let生命的变量只在他所在的代码块有效
    var b = 1;
}

console.log("typeof a is undefined is "+(typeof a === 'undefined'))   //true
console.log("typeof b is undefined is "+(typeof b === "undefined"))   //false
console.log("b = "+b);

/*
for循环计数器，就很适合let命令
*/

for(let i = 0; i < 10; i++){
    setTimeout(function(){
        console.log(i);
    });
}
//0 1 2 3 4 5 6 7 8 9
//let声明的计数器i，只在for循环体内有效，在循环体外访问就会报错
console.log("typeof i is undefined is "+(typeof i === 'undefined'))  //true
//下面的代码如果使用var，最后输出的是10
for(var i = 0; i < 10; i++){
    setTimeout(function(){
        console.log(i)
    });
}
//10 10 10 10 10 10 10 10 10 10
//var生命的计数器i，在全局范围都有效，所以可以正常输出。
console.log("i = "+i);

/*
for循环有一个特别之处，
设置循环变量的那部分是一个父作用域，
循环体那部分是一个子作用域
*/

for(let i = 0;i<3;i++){
    let i = 'abc';
    console.log("i = "+i);
}
//abc abc abc

/*
let命令的特点
1.区别于var命令，let命令不允许变量提升，即变量一定要在声明之后使用；
2.暂时性死区（Temporal Dead Zone，简称TDZ），在区块中如果存在let命令，这个区块对这个命令生命的变量形成封闭作用域，
  凡是在声明之前使用该变量，就会报错 ReferenceError。
  所以在区块中，在let命令声明变量之前，不能使用该变量，这在语法上称为“暂时性死区”。
3.不允许重复声明，let不允许在相同作用域内，重复生命同一个变量。
*/

/*
ES6规定暂时性死区和不允许变量提升，主要是为了减少运行时错误，放置在变量声明前就使用这个变量，从而导致意料之外的行为。
*/

/*-------------------------------------*/