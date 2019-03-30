/*
字符串的正则方法
*/

//1.match()方法，用于在字符串中寻找与正则匹配的字符串
{
    let str = "abc&ABC";
    console.log("str.match(regex) is "+str.match(/abc/));      //abc，字符串中存在匹配正则/abc/的子字符串，为abc
}

//2.replace()方法，用于在字符串中将匹配指定正则替换成对应的字符串
{
    let str = "abc&ABC\naBcd";
    console.log("str.replace(/abc/igm,'def') is "+str.replace(/abc/igm,'def'));   //def&def&\ndef，字符串中将匹配/abc/igm的子字符串，替换为def
}

//3.search()方法，用于在字符串中检索正则指定的字符串，并输入第一个与正则匹配的子串的位置
{
    let str = "tabciekdabc";
    console.log("str.search(/abc/) is "+str.search(/abc/));    //1，在字符串中，检索匹配正则/abc/的第一个子字符串的位置
    console.log("str.search(/abc/g) is "+str.search(/abc/g));    //1，在字符串中，检索匹配正则/abc/g的第一个子字符串的位置
}

//4.split()方法，用于根据某正则表达式将字符串分割成若干个子字符串
{
    let str = "123abc34rabc2423abcaer3";
    console.log("str.split(/abc/) is "+str.split(/abc/));    //将字符串，用/abc/分割成字串数组['123','34r','2423','aer3']
}