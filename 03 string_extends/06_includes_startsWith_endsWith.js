/*
includes()
starts_With()
ends_With()
*/

{
    let str = "Hello World!";
    //返回bool值，表示参数字符串是否在源字符串头部
    console.log("str.startsWith(\"Hello\") is "+str.startsWith("Hello")); 
    //返回bool值，表示参数字符串是否在源字符串尾部   
    console.log("str.endsWith(\"World!\") is "+str.endsWith("World!"));
    //返回bool值，表示字符串是否包含某参数字符串
    console.log("str.includes(\"ello\") is "+str.includes("ello"));

    //startsWith()有第二个参数，表示开始搜索的位置，应该是第一个参数的第一个字符所在的索引
    console.log("str.startsWith(\"ello\",1) is "+str.startsWith("ello",1));
    //endsWith()有第二个参数，表示开始搜索的位置，应该是第一个参数的最后一个字符的索引+1
    console.log("str.endsWith(\"Hell\",4) is "+str.endsWith("Hell",4));
    //includes()有第二个参数，表示开始搜索的位置，应该是第一个参数的第一个字符所在的索引
    console.log("str.includes(\"World\",6) is "+str.includes("World",6));
}