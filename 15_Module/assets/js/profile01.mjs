export let firstName = "Michael";
export let lastName = 'Jackson';
export let year = 1988;

let firstName2 = "Michael2";
let lastName2 = 'Jackson2';
let year2 = 1989;
export {firstName2,lastName2,year2};

/*
以上展示了export，输出变量的两种写法，
两种写法是等价的，但是优先考虑第二种写法，
因为第二种较为清晰的展示出所有输出的变量
*/

//export命令除了可以输出变量，还可以输出函数或类class
export function multiply(x,y){
    return x*y;
}

export class Person{
    constructor(name,age){
        this.Name=name;
        this.Age = age;
    }

    getName(){
        return this.Name;
    }

    getAge(){
        return this.Age;
    }
}

/*
通常情况下，export输出的变量就是其本来的名字，
但是，我们也可以通过as关键字重命名变量
*/

function v1(){}

function v2(){}

export {
    v1 as streamV1,  //用streamV1替换v1
    v2 as streamV2   //用streamV2替换v2
};

//特别需要注意的是，export命令规定的是对外的接口，
//所以必须与模块内部的变量建立一对一的关系。

//export 1
//var m = 2; export m
//第一种写法，直接输出数值1，第二种写法输出的是值为1的变量。
//它们输出的都不是接口，所以写法不正确，正确的写法是：

export let m = 1;   //规定了对外的接口m
let m2 = 1;
export {m2};        //规定了对外的接口m2
let n = 1;
export {n as m3};   //规定了对外的接口m3

//另外，export语句输出的接口，与其对应的值是动态绑定关系
export let foo = 'bar';
foo = 'baz';

/*
第一次获取foo变量的值是bar，
当第二次再获取foo变量的值，则为baz。
*/

//最后，export命令可以出现在js模块的任意位置，
//但是必须是模块顶层，不可被包在其它代码块和方法中。
