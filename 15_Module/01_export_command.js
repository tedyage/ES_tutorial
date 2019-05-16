/*
export命令
*/

/*
模块功能主要有两个命令构成，export和import，
export命令用于规定模块的对外接口，
import命令用于输入外部模块提供的功能。
*/

//export

var firstName2 = "Michael2";
var lastName2 = "Jackson2";
var year2 = 1958;

module.export= {
    firstName2,
    lastName2,
    year2
}

//export不但可以输出变量，还可以输出函数或者类

export function multiply(x,y){
    return x*y;
};