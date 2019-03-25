/*
函数参数的解构赋值
*/

//函数的参数表面上是一个数组，但是再传入参数参数的那一刻，
//数组参数就被解构成具体变量，对于函数内部来说，就能直接访问那些变量。
function add([a,b]){
    return a+b;
}

console.log(add([1,2]));     //3

console.log([[1,2],[3,4]].map(([a,b])=>a+b));    //[3,7]

//函数参数的解构也可以使用默认值
function move({x=0,y=0}={}){
    return [x,y];
}

console.log(move({x:3})) ;      //[3,0]
console.log(move({y:6}));       //[0,6]
console.log(move({x:4,y:9}));   //[4,9]
console.log(move({}));          //[0,0]
console.log(move());            //[0,0]

function move2({x,y}={x:0,y:0}){
    return [x,y];
}
console.log(move2({x:3,y:8}));     //[3,8]
console.log(move2({x:3}));         //[3,undefined]
console.log(move2({y:4}));         //[undefined,4]
console.log(move2({}))             //[undefined,undefined]
console.log(move2())               //[0,0]
//move2方法是对参数{x,y}设定了默认值{x:0,y:0}，
//并不是对x和y设定默认值，也就是x,y没有默认值。
//所以结构失败的参数，都是undefined

//undefined会触发函数参数的默认值
console.log([1,undefined,3].map((x="yes")=>x));    //[1,'yes',3]
console.log([1,undefined,3].map((x)=>x));    //[1,undefined,3]