/*
y 修饰符
ES6还为正则表达式添加了y修饰符，叫做“粘连”(sticky)修饰符
*/

//y修饰符的作用g修饰符类似，也是全局匹配，
{
    let s = 'aaa_aa_a';
    let r1 = /a+/g;
    let r2 = /a+/y;
}