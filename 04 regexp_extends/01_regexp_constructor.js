'use strict'
/*
RegExp 构造函数
*/

/*ES5中，RegExp构造函数的参数有两种情况。
第一种情况是，第一个参数是字符串，第二个参数是表达式修饰符
*/

var regex = new RegExp('xyz','i');  //等价于 var regex = /xyz/i;
console.log(regex);
//第二种情况是参数是一个正则表示式，这时会返回一个原正则表达式的拷贝
var regex = new RegExp(/xyz/i);   //等价于 var regex = /xyz/i;
console.log(regex);
//但是ES5不允许此时使用第二个参数添加修饰符，否则就会报错。
//var regex = new RegExp(/xyz/,'i');

//ES6允许RegExp构造函数中，第一个参数是正则对象，第二个参数是修饰符，
//并且返回的正则表达式会忽略原有的正则表达式的修饰符，只是用新制定的修饰符。
var regex = new RegExp(/abc/ig,'i');
//上面代码中，原有的正则对象的修饰符是ig，结果被第二个参数i覆盖。
console.log(regex);
console.log(regex.flags);

//正则表达式中常用的修饰符有i,g,m等
//i:不区分大小写；
{
    let regex1 = /abc/i
    let str1 = "ABC";
    let str2 = "abc";
    let str3 = "aBc";

    console.log("str1.match(regex1) is "+str1.match(regex1));    //ABC  i修饰符意味着正则校验忽略大小写
    console.log("str2.match(regex1) is "+str2.match(regex1));    //abc
    console.log("str3.match(regex1) is "+str3.match(regex1));    //aBc
}

//g:全局匹配；
//如果不加g，正则过程中字符串从左到右匹配，找到第一个符合条件的就匹配成功，
//入过加g，正则过程中字符串从左到右匹配，找到每个符合条件的都记录下来，知道字符串结尾。
{
    let regex1 = /abc/;
    let regex2 = /abc/g;

    let str1 = "abc&abc&abcd";
    console.log("str1.match(regex1) is "+str1.match(regex1));    //abc  只输出字符串中的第一个匹配正则的子字符串
    console.log("str1.match(regex2) is "+str1.match(regex2));    //['abc','abc','abc']  输出字符串中全部的匹配正则的子字符串
}

//m:多行匹配
//若存在换行并且有开始^或结束$的情况下，和g一起使用实现全局匹配，
//因为存在换行时默认会把换行符作为一个字符任务，匹配字符串是个单行，
//g只匹配第一行，添加m之后可实现多行，每个换行符之后就是开始
{
    let regex1 = /^ab/m;
    let regex2 = /^ab/gm;
    let regex3 = /ab/gm
    let regex4 = /cd$/m;
    let regex5 = /cd$/gm;

    let str1 = "tabcd\nabcd";

    console.log(str1.match(regex1));    //ab   以换行符之后的第一个字符为头，输出匹配/^ab/的第一个字符串
    console.log(str1.match(regex2));    //ab   以换行符之后的第一个字符为头，在每行中匹配全部的/^ab/的字符串
    console.log(str1.match(regex3));    //['ab','ab']   以换行赋值后的第一个字符为头，在每行出匹配全部的/ab/的字符串
    console.log(str1.match(regex4));    //['cd']
    console.log(str1.match(regex5));    //['cd','cd']
}


