/*
静态属性
*/

//指向类本身的属性，通用的写法是这样
class Foo{
    constructor(){

    }
}

Foo.prop = 'abc';               //在类的外部定义静态属性
console.log(Foo.prop);          //abc

//现在新提案中包含静态属性的定义，就是在属性前加入static关键字

try{
    class Foo2{
        static prop = 'abc';
    }
    //这样的写法在语义上，更符合静态属性的表达。
    console.log(Foo2.prop);         //abc
    
}catch(e){
    console.error(e.message||e);
}
//目前它还是个提案，并不是正式的标准，所以不是所有环境都支持这种语法。
