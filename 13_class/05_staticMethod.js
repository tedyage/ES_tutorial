/*
静态方法
*/

//如果在类内部的方法前面加入static关键字，就表示此方法是静态方法，
//不会被类的实例调用，而是被类直接调用。

class Foo{
    constructor(){
        //...
    }

    static bar(){
        return 'Hello World.';
    }
}

console.log(Foo.bar());      //Hello World
try{
    let foo = new Foo();
    console.log(foo.bar());  //foo.bar is not a function
}
catch(e){
    console.error(e.message||e);
}

//注意静态方法中的this，指向的是此类，而不是类的实例

class MyClass{
    constructor(){
        this.prop = "a";         //this指向的是MyClass的实例
    }

    static bar(){
        return this.baz();       //this指向的是MyClass类，MyClass类执行静态方法baz()
    }

    static baz(){
        return this.prop;        //undefined，因为this指向的不是MyClass实例。
    }
}

console.log(MyClass.bar());      //undefined

//父类的静态方法，可以被子类继承

class Parent{
    constructor(){
        //...
    }

    static sayName(){
        return this.name;        //Class.name
    }
}

class Child extends Parent{
    constructor(){
        super();
    }
}
console.log(Parent.sayName());    //Parent
console.log(Child.sayName());     //Child
//或者使用super对象调用父类静态方法

class Parent1{
    constructor(){
        //...
    }

    static sayName(){
        return this.name;
    }
}

class Child1 extends Parent1{
    constructor(){
        super();
    }

    static sayName(){
        return super.sayName() + "_"+this.name;
    }
} 

console.log(Child1.sayName());      //Parent1_Child1

