/*
字符串遍历器
ES6为字符串添加了遍历器，使得字符串可以做for...of循环遍历
*/

{
    for(let str of 'hello world'){
        console.log("str is "+str);
    }
    
    //该遍历器最大的优点是可以识别大于0xFFFF的码点。
    //传统的for循环无法识别这样的码点
    let str = '\u{20BB7}';
    for(let i = 0; i<str.length; i++){
        console.log(str[i]);          //无法正常输出字符
    }

    for(let s of str){
        console.log(s);
    }
}