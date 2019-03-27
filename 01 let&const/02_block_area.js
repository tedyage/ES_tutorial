/*----------------块级作用域---------------*/

/*
ES5只有全局作用域和函数作用域，这回带来很多不合理的场景
*/
//场景1，内层变量可能会覆盖外层变量
var temp = new Date();

function f(){
    console.log(temp);                   //undefined，因为内层作用域也声明了temp变量，这就是变量提升
    if(false){
        var temp = "hello word";
    }
};

f();
//输出undefined的原因，就是在函数内部，存在变量提升现象，
//函数作用域内在访问temp变量之后，又声明了temp变量，所以在函数作用域内，输出的是undefined

//场景2，用来计数的循环变量泄露为全局变量
var s = 'hello';

for(var i = 0; i < s.length; i ++){
    console.log(s[i]);
    //h e l l o
}

console.log(i);      //5
//计数变量i在循环结束之后，他没有消失，泄露成了全局变量。

/*
ES6带来块级作用域
*/
//let实际上为Javascript新增了块级作用域

function f1(){
    let n = 5;
    if(true){
        let n = 10;
        console.log(n);    //10
    }
    console.log(n);        //5
}

f1();
//上面的函数中，有两个块级作用域，
//外层作用域声明了变量n，并且赋值为5，输出也是5，
//内层作用域声明了变量n，并且赋值为10，输出也是10，
//这表示内外两层作用域互不影响

//ES6允许块级作用域的嵌套，且外层作用域无法访问内层作用域的变量。
{
    {
        let insane = 'Hello world';
    }
    console.log("typeof insane is undefined is "+(typeof insane === 'undefined'));    //ReferenceError
}
//内层作用域可以声明与外层作用域同名的变量
{
    let insane = 'Hello World';
    {
        let insane = 'Hello World2';
        console.log("insane = \"Hello World2\" is "+(insane === "Hello World2"));
    }
    console.log("insane = \"Hello World\" is "+(insane === "Hello World"))
}
//块级作用域，使得我们不再必要使用IIFE——立即执行函数表达式了。

/*
ES6允许在块级作用域中声明函数，函数声明语句的行为类似于let，在块级作用域之外不可访问此函数。
*/

function f(){
    console.log("I am outside.");
}

(function(){
    if(true){
        function f(){
            console.log("I am inside.");
        }       
    }
    f();                
})();

//因为块级作用域内声明函数类似于let，对于作用域之外没有影响。
//但是这改变了块级作用域内声明的函数的处理规则，对老代码产生很大影响。
//为了减轻因此产生的不兼容问题，ES6规定，浏览器的实现可以有自己的行为方式
//  1.允许在块级作用域内声明函数
//  2.函数声明类似于var，会提升到全局作用域或函数作用域头部。
//  3.同时，函数声明还会提升到块级作用域头部
//考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。
//如果需要，最好写成函数表达式，而不是函数声明语句。
//ES6块级作用域内声明函数，只能在大括号内部的情况下成立，若没有大括号，就报错。