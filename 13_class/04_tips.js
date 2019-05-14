/*
注意点
*/
//01.class与模块的内部，默认使用的是严格模式，所以不需要用use strict指定严格模式
//02.不存在提升，class不存在变量提升，必须先定义类，再初始化实例，否则会报错。
//03.Generator方法，如果类内部的某个方法加入了*，则代表是Generator方法
{
    class Foo{
        constructor(...args){
            this.args = args
        }

        *[Symbol.iterator](){
            for(let i = 0; i < this.args.length; i++){
                yield this.args[i];
            }
        }
    }

    let foo = new Foo(1,2,3,4,5,6,7);
    for(let item of foo){
        console.log(item);       //1,2,3,4,5,6,7
    }
    /*
    一个类如果内部含有Symbol.iterator方法，且是一个Generator方法，
    则该类的实例，是iterable的。
    */
}
//04.this的指向
{
    class Logger{
        constructor(value){
            this.value = value;
        }

        info(){
            return this.value;
        }
    }

    let log = new Logger("abc");
    console.log(log.info());          //abc
    try{
        let {info} = new Logger("abc");
        console.log(info());              //TypeError: Cannot read property 'value' of undefined
    }catch(e){
        console.error(e.message||e);
    } 
    //this指向的是方法在执行是所在的上下文环境。
    //如果将info()方法单独提取出来使用，this会指向info()在执行时所在的上下文环境，而全局上下文环境中不具备value属性，所以会报错   

    //箭头函数中的this，指向的是方法在定义时所在的上下文环境中，可以解决this指向环境不明确的问题。
    class Logger2{
        constructor(value){
            this.value = value;
            this.info = ()=>{
                return this.value;
            }
        }
    }

    let {info} = new Logger2("abc");
    console.log(info());              //abc
}