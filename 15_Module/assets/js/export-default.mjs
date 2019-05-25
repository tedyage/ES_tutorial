export default function(){
    console.log('foo');
}

//export default代表的是模块的默认输出。
//一个模块只能有一个默认输出。
//所以export default命令在一个模块中只能使用一次。

/*
本质上，export default就是输出一个叫做default的变量或者方法，
然后系统允许为default取任意的名字。
*/

//export default后面不能跟变量声明语句
//export default let a = 1;    //会出错，Uncaught SyntaxError: Unexpected strict mode reserved word

let each = function(){console.log("each")};
let foreach = each;
export {each,foreach};
//一个模块，可以有一个默认输出，和n个指定输出。




