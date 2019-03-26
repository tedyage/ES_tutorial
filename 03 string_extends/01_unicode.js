/*
字符的Unicode的表示法
Javascript允许采用\uxxxx形式表示一个字符，其中xxxx表示Unicode的码点
*/

{
    //必须以\u开头，u必须小写
    let str1 = "\u0061";
    console.log("str1 is "+str1);
    //这种表示法只限于\u0000~\uFFFF之间的字符，超出这个范围，必须用两个字节形式表示
    let str2 = "\uD842\uDFB7"
    console.log("str2 is "+str2);
    //ES6对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符
    let str3 = "\u{20BB7}";
    console.log("str3 is "+str3);
}

