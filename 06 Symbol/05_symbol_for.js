/*
Symbol.for()&Symbol.keyFor()
Symbol.for()方法接受一个字符串的参数，生成的Symbol值是相同的，
这与之前的Symbol()生成Symbol值不同
*/

{
    let s1 = Symbol.for("foo");
    let s2 = Symbol.for("foo");

    console.log(`s1 === s2 is ${s1===s2}`); //true

    //Symbol.for("key")生成的新的Symbol，会被登记在全局环境中供搜索，
    //再次调用时，会先检查给定的key是否已经存在，如果不存在才会新建一个Symbol值，
    //如果存在就返回存在的那个Symbol值。

    let s3 = Symbol("foo");
    let s4 = Symbol("foo");

    console.log(`s3 === s4 is ${s3===s4}`); //false

    //Symbol("key")，每一次调用都会返回新的Symbol值
}

{
    //Symbol.keyFor方法，返回一个已登记的Symbol值的key
    let s1 = Symbol.for("foo");
    console.log(`Symbol.keyFor(s1) is ${Symbol.keyFor(s1)}`);  //foo
    
    let s2 = Symbol.for('foo');
    console.log(`Symbol.kerFor(s2) is ${Symbol.keyFor(s2)}`);  //undefined
}