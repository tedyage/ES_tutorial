/*
new.target属性
*/

/*
new.target属性，一般用在构造函数值中，
返回new命令作用于的构造函数，
如果构造函数不是通过new命令调用的，则new.target会返回undefined
因此此属性可以确定构造函数是如何调用的。
*/

function Person(name){
    if(new.target){
        this.name = name;
        console.log(this.name);
    }else{
        throw new Error("必须使用new命令生成实例。");
    }    
}

try{
    let p1 = new Person('tedyage');    //tedyage
    let p2 = Person.call(p1,'mxj');    //必须使用new命令生成实例
    //p1是通过new关键字生成的实例，所以通过了。
    //p2没有通过new关键字生成实例，所以new.target为undefined，所以抛出异常了。
}catch(e){
    console.error(e.message||e);
}

//new.target返回的值是当前的Class
class Parent{
    constructor(){
        this.classname = new.target.name;
    }

    sayName(){
        return this.classname;  //返回当前的类的名称
    }
}

class Child extends Parent{
    constructor(){
        super();
    }
}

let p = new Parent();
let c = new Child();
console.log(p.sayName());          //Parent
console.log(c.sayName());          //Child，返回的是当前使用的类的类名
