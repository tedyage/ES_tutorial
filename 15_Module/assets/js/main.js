import {firstName,lastName,year} from "./profile01.mjs";

function setName(element){
    element.name = firstName + ' ' + lastName;
    element.year = year;
}

let e={};
setName(e);
console.log(e);      //{name: "Michael Jackson",year:1988}

//如果想为输入的变量重命名，import命令要使用as关键字，将输入的变量重命名
import { firstName2 as familyName } from "./profile01.mjs";
console.log("familyName as firstName2 is "+familyName);

//import命令输入的变量都是只读的，不允许在加载模块的脚本里面改写接口的值
import {year as myYear} from "./profile01.mjs";
try{
    myYear = 1978;          //Assigment to constant variable，不能为常量赋值
}catch(e){
    console.error(e.message||e);
}
//如果输入的是一个对象或者数组，那么可以对对象的属性值和数组内部的元素进行修改，
//不过，这种写法很难查错，所以建议凡是输入的变量，都完全当作只读。

//import的from后面，指定的是模块的路径，可以是绝对的，也可以是相对的。
import {multiply} from "./profile01.mjs";
console.log(multiply(3,2));
import {multiply as multiply2} from "http://127.0.0.1:5000/assets/js/profile01.mjs";
console.log(multiply2(5,8));
//如果没有路径名，只有模块名称，则必须要有配置文件，告诉Javascript引擎该模块的位置。
//import myMethod from "util";   Relative references must start with either "/","./" or "../".
//util是一个模块文件名，由于没有带有路径，所以会报错。

//import命令拥有变量提升的功能，会提升到整个模块的头部，首先执行。
console.log("m is "+m);    //m is 1
import{m} from "./profile01.mjs";
//虽然import命令写在输出m的值的语句的下方，
//但是import命令提升到输出语句之前执行，所以可以正常输出m is 1

/*
import是静态执行，所以不能使用表达式，变量和语句来执行import命令，
否则，在静态分析阶段，这些语法都没法获取到值，就会报错
*/
//let mod = './profile01.mjs';
//import {foo} from mod;          Uncaught SyntaxError: Unexpected identifier

/*
import命令会执行所加载的模块，因此可以有下面的写法
*/
import "./profile01.mjs";
//此代码仅仅是执行./profile01.mjs模块，但是不会输入任何借口。

/*
如果多次重复的写同一句import命令，那么此命令只执行一次，而不会重复多次执行。
*/
import "./profile01.mjs";
import "./profile01.mjs";
//只会执行一次。

import {foo} from "./profile01.mjs";
import {streamV2} from "./profile01.mjs";
//上面代码，foo和bar是分开两次输入的，
//但是是从一个profile01模块实例中加载的。
//相当于
import {foo as foo2,streamV2 as v2} from "./profile01.mjs";

/*
目前，通过Babel转码，CommonJS模块的require命令和ES6模块的import命令，
可以写在同一个模块里面，但是最好不要这样做。
因为import在静态解析阶段执行，所以他是一个模块中最早执行的。
这可能会将模块的输入顺序不符合模块依赖的加载顺序，就会可能得到预期之外的结果
*/

/*
模块整体加载
除了指定家在某个输出值，还可以使用整体加载，
即使用*指定一个对象，所有输出值都加载在这个对象上面。
*/

import * as circle from "./circle.mjs";
console.log("圆面积："+circle.area(3));
console.log("圆周长："+circle.circumference(3));
//模块整体加载，应该是静态分析的，所以不允许运行时改变，
//这是区别于之前说的，可以改变对象内部属性的说法。
try{
    circle.foo = "hello"
}catch(e){
    console.error(e.message||e);     //Cannot add property foo, object is not extensible
}


/*
export default 命令
从前面的例子可以看出，使用import命令输入变量的时候，
必须知道变量名，否则无法加载。
可有时，import命令并不知道所要加载的模块都包含哪些属性，
此时可以用到export default命令，为模块提供默认输出
*/
import customName from "./export-default.mjs";
//此时import命令可以不用加括号，直接用任意名称指向export-default输出的方法。
customName();     //foo

//一条import命令可以实现同时输入默认变量或方法和指定接口变量与方法，写法可以是这样
import abc,{each,foreach} from "./export-default.mjs";
abc();
each();
foreach();

import MyClass from "./MyClass.mjs";
let myclass = new MyClass('tianzhiqiang','1988-11-20');
console.log(myclass.getAge());

//引用ex_im_combine模块
import {area,circumference} from "./ex_im_combine.mjs";    //引入模块的area,circumference属性
console.log("the area of the circle is "+ area(4) );
console.log("the circumference of the circle is "+circumference(4));

import {circleArea} from './ex_im_combine.mjs';     //引入模块的circleArea别名属性
console.log("the circleArea of the circle is "+ circleArea(5));

import * as circle01 from './ex_im_combine.mjs';    //引入模块的全部
console.log('the area of the circle01 is '+circle01.area(6));

import circum from './ex_im_combine.mjs';      //引入模块的default输出
console.log('the circle area is '+circum(6));












