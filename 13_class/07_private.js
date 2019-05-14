/*
私有方法和私有属性
*/

//目前我们为某个类定义私有方法的方式如下

function Person(){
    this.Foo=function(){
        console.log('Hello World');
        baz.apply(this,[1,2,3,4,5]);
    }
};

function baz(...args){
    console.log(args);
}

let p = new Person();
p.Foo();  //Hello World,[1,2,3,4,5]
console.log(p);      //{Foo:}
//利用function的apply或者call方法，将全局上下文转移到实例对应的类内部上下文，所以调用成功
//以上例子，baz方法是一个外部方法，不在Person类内部上下文中，
//所以实例p中是看不到baz方法的。

//如果熟悉Symbol值的唯一性这一特性，也可以将私有方法命名为一个Symbol值
class MyClass{
    constructor(){
        //...
    }

    [baz](...args){
        console.log(args.toString());
    }

    foo(...args){
        return this[baz](args);
    }
}
let myclass = new MyClass();
myclass.foo(1,2,3,4,5);       //1,2,3,4,5
//由于baz是Symbol值，所以一般情况下无法直接获取到它们，因此达到了私有属性或私有方法的效果，
//但是也不是绝对无法获取到，比如以下方法就可以获取得到。
console.log(Reflect.ownKeys(myclass.__proto__));    //["constructor","function baz(...args){}","foo"]   

/*
有关私有属性的提案
*/

class IncreaseCounter{
    constructor(){
        this.#count = 0
    }

    get value(){
        return this.#count;
    }

    increment(){
        this.#count++;
    }
}

let counter = new IncreaseCounter();
console.log(counter.value);            //0
counter.increment();                   
console.log(counter.value);            //1
console.log(Reflect.ownKeys(counter)); //[]

//由于该提案，还未正式通过，没有成为正是标准，所以不是所有环境都支持此语法。

