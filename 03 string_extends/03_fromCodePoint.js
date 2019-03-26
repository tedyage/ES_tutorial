/*
String.fromCodePoint()
*/

{
    //ES5提供的String.fromCharCode()，不能识别大于0xFFFF的字符，32位的UTF-16。
    console.log(String.fromCharCode(0x20BB7));

    //ES6提供了String.fromCodePoint()，可以识别大于0xFFFF的字符
    console.log(String.fromCodePoint(0x20BB7));
}