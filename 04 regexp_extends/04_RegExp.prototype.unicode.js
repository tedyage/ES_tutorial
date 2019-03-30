/*
正则对象增加了unicode属性，表示是否设置了u修饰符
*/

{
    let reg1 = /\u{20BB7}/,
        reg2 = /\u{20BB7}/u;

    console.log("reg1.unicode is "+reg1.unicode);    //false
    console.log("reg2.unicode is "+reg2.unicode);    //true
}