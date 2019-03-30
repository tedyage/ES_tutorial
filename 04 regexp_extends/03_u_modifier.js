/*
u 修饰符
*/

//u修饰符，含义为“Unicode”模式，用来正确处理大于\uFFFF的Unicode字符。
//也就是说会正确处理四个字节的UTF-16编码

{
    var reg1 = /^\uD83D/u,
        reg2 = /^\uD83D/;
    
    //声明变量str，并赋值大于\uFFFF的Unicode字符
    var str = "\uD83D\uDC2A";
    console.log("reg2.test(str) is "+reg2.test(str));  //true，因为reg2不能识别\uFFFF的Unicode字符，会默认其为两个字符
    console.log("reg1.test(str) is "+reg1.test(str));  //false,reg1可以识别\uFFFF的Unicode字符  
}

//点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。
//对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u修饰符
{
    let str = '𠮷';

    let reg1 = /^.$/;
    let reg2 = /^.$/u;

    console.log("reg1.test(str) is "+reg1.test(str))  //false,对于码点大于0xFFFF的Unicode字符，点字符不能识别此字符
    console.log("reg2.test(str) is "+reg2.test(str))  //true,对于码点大于0xFFFF的Unicode字符，必须加入u修饰符，点字符才可以识别
}

//量词
//使用u修饰符后，所有量词都会正确识别码大于0xFFFF的Unicode字符
{
    let reg1 = /a{2}/,
        reg2 = /a{2}/u,
        reg3 = /𠮷{2}/,
        reg4 = /𠮷{2}/u;

    console.log("reg1.test('aa') is "+reg1.test('aa'));  //true
    console.log("reg2.test('aa') is "+reg2.test('aa'));  //true
    console.log("reg3.test('𠮷𠮷') is "+reg3.test('𠮷𠮷'));  //false，由于𠮷属于超过0xFFFF的字符，没有u修饰符，所以无法识别
    console.log("reg4.test('𠮷𠮷') is "+reg4.test('𠮷𠮷'));  //true
}

//Unicode字符表示法
//ES6新增了使用大括号表示Unicode字符，这种表示法在正则表达式中必须加上u修饰符，
//才能识别当中的大括号，否则会被解读为量词。
{
    let reg1 = /\u{61}/;
    let reg2 = /\u{61}/u;
    
    let str = 'a';
    console.log("reg1.test(str) is "+reg1.test(str));  //false,正则表达式中包含大括号表示的Unicode字符,无法识别Unicode字符
    console.log("reg2.test(str) is "+reg2.test(str));  //true,正则表达式中有u修饰符，故正则表达式可以识别里面的\u{61}

    let reg3 = /\u{20BB7}/u;
    let str1 = '𠮷';
    console.log("reg3.test(str1) is "+reg3.test(str1));  //true,正则表达式中u修饰符，故可以识别\u{20BB7}.
}

//预定义模式
//\S是预定义模式，匹配所有非空白字符，
//只有加了u修饰符，它才能正确匹配码点大于0xFFFF的Unicode字符
{
    let reg1 = /^\S$/;
    let reg2 = /^\S$/u;
    let str = "\u{20BB7}";
    console.log("\u{20BB7} is "+str);
    console.log("reg1.test('a') is "+reg1.test('a'));  //true
    console.log("reg1.test('\u{20BB7}') is "+reg1.test(str));  //false
    console.log("reg2.test('a') is "+reg2.test('a'));  //true
    console.log("reg2.test('\u{20BB7}') is "+reg2.test(str));  //true
}

//i修饰符
{
    //有些Unicode字符的编码不同，但是字型很相近，
    let reg1 = /[a-z]/i;
    let reg2 = /[a-z]/iu;
    let str1 = '\u{212A}',
        str2 = '\u{004B}';
    console.log("\u{212A} is "+str1);
    console.log("\u{004B} is "+str2);
    //不加u修饰符，就无法识别非规范的K字符
    console.log("reg1.test('\u212A') is "+reg1.test('\u212A'));   //false
    console.log("reg1.test('\u004B') is "+reg1.test('\u004B'));   //true
    console.log("reg2.test('\u212A') is "+reg2.test('\u212A'));   //true
}