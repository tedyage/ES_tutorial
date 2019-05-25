/*
export与import的复合用法
*/

//如果在一个模块之中，先输入后输出同一个模块，
//import语句可以与export语句写在一起，如下面代码所示：
export {area,circumference} from './circle.mjs';

//它可以被理解为
//import {area,circumference} from './circle.mjs';
//export {area,circumference}

//上面代码中，export和import语句可以结合在一起，
//但是注意：area和circumference没有被导入到当前模块，
//只是将area和circumference转发到外部，所以area和circumference不能在当前模块使用

try{
    console.log(area)                       //undefined
    console.log(circumference)              //undefined
}catch(e){
    console.error(e);                       //area is not defined
}

//模块的接口改名as，也可以采用这种写法。
export {area as circleArea} from './circle.mjs'
//这相当于：
//import {area as circleArea} from './circle.mjs';
//export {circleArea}

//模块的整体输出，也可以采用这种写法
export * from './circle.mjs';
//这相当于：
// import * as circle01 from './circle.mjs';
// export {circle01};

//默认接口的写法如下
export { circumference as default } from './circle.mjs';                
//这相当于
//import {circumference} from './circle.mjs'
//export {circumference as default};
