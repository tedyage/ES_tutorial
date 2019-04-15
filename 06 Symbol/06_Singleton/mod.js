//如何保证在任何时候调用A类，返回的都是同一个实例？

function A(){
    this.foo = `hello`;     
    this[Symbol.for('bar')] = `hello2`;
}
//很容易想到，可以吧实例赋给顶层对象global
if(!global._foo){
    global._foo = new A();
    //foo属性，如果一个js文件对它进行了重写，会影响到其它的js文件的引用
    //[bar]属性，如果一个js文件对它进行了重写，不会影响到其它的js文件的引用，
    //因为Symbol()值，是独一无二的。
}
//并将其当作模块输出出去
module.exports = global._foo;