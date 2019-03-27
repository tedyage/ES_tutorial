/*
字符串的解构赋值
*/

//字符串解构赋值，要先讲字符串转换成字符串数组
let [a,b,c,d,e]="Hello World";
console.log("a is "+a);           //H
console.log("b is "+b);           //e
console.log("c is "+c);           //l
console.log("d is "+d);           //l
console.log("e is "+e);           //o

//字符串转换成string对象，对象会带有length属性，所以可以对此属性解构赋值
let {length} = 'hello world'
console.log("length is "+length);