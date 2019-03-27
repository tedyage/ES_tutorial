/*
ES6为String对象，提供了raw()
String.raw方法，用来充当模板字符串的处理函数，返回一个斜杠都被转移的字符串，对应于替换变量后的模板字符串。
*/

{
    console.log(String.raw`Hi\n${2+3}`);         //Hi\\n5
    //如果源字符串的斜杠已经转义，那么String.raw会进行再次转义
    console.log(String.raw`Hi\\n`);              //Hi\\\\n
}

{
    //String.raw方法也可以作为正常的函数使用。
    //第一个参数，应该是一个具有raw属性的对象，且raw属性应该是一个数组
    //此函数返回的是再对头一个参数中raw属性对应的字符串的相应位置拼接后面的对应字符的拼接结果
    console.log(String.raw({raw:'test'},0,1,2));     //t0e1s2t
}
