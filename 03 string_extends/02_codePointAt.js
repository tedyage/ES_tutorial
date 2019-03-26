/*
codePointAt()方法
Javascript内部，字符是以UTF-16格式储存，每个字符固定2个字节，
而对于4个字节的字符（如“𠮷”，\uD842\uDFB7），javascript不能正确处理，字符串长度会默认为2.
chatAt方法无法正确读取这个字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值
*/

{
    let str = "𠮷";
    console.log("str length is "+str.length);
    for(let i = 0; i < str.length; i++){
        console.log("str charAt("+i+") is "+str.charAt(i));
        //charAt()无法正常读取字符，所以无法返回正常结果
    }

    for(let i = 0; i < str.length; i++){
        console.log("str charCodeAt("+i+") is "+str.charCodeAt(i));
        //charCodeAt()只能返回前两个字节和后两个字节的值
    }

    /*
    ES6提供了codePointAt()，可以处理4个字节的字符，返回字符的正常码点
    */
    console.log("str.codePointAt() is "+str.codePointAt(0));
    //4个字节的字符，codePointAt()可以正确识别，
    //2个字节的字符，codePointAt()的返回结果与charCodeAt()相同

    //对于输出一个字符串，且字符串中包含4个字节的字符，如何准确输出每个字符的码点
    //答案是循环输出
    let str2 = "𠮷abc";
    for(let s of str2){
        console.log("s.codePointAt() is "+s.codePointAt(0));
    }
}