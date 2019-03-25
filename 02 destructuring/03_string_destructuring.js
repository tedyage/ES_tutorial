/*
字符串的解构赋值
*/

//字符串解构赋值，要先讲字符串转换成字符串数组
let [a,b,c,d,e]="Hello World";
console.log("a is "+a);
console.log("b is "+b);
console.log("c is "+c);
console.log("d is "+d);
console.log("e is "+e);

//字符串转换成数组对象，会带有length属性，所以可以对此属性解构赋值
let {length} = 'hello world'
console.log("length is "+length);