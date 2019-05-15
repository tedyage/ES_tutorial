/*
简介
*/

//在ES6之前，类的继承一般是这样写的
//定义一个Parent类，内部有name/age属性和getName/getAge方法
function Parent(name,age){
    this.name = name;
    this.age = age;
}

Parent.prototype.getName = function(){
    return this.name;
}

Parent.prototype.getAge = function(){
    return this.age;
}

let parent = new Parent('Bob',33);
console.log(parent.getName());          //Bob
console.log(parent.getAge());           //33

function Child(name,age,gender){
    //继承属性，也可以用Parent.apply(this,[name,age])
    Parent.call(this,name,age);
    this.gender = gender;
}
//原型链继承Parent的内部方法，不过要还原Child的构造函数，否则其构造函数就是Parent的构造函数
Child.prototype = new Parent();
Child.prototype.constructor = Child;

Child.prototype.getGender = function(){
    return this.gender;
}

let child = new Child('Jack',3,'boy');
console.log(child.getName());           //Jack
console.log(child.getAge());            //3
console.log(child.getGender());         //boy

//这样的写法，语义不够清晰，写法也不够方便
//ES6提供了Class，也提供了extends关键字，可以实现继承

class Parent2{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    getName(){
        return this.name;
    }

    getAge(){
        return this.age;
    }
}

class Child2 extends Parent2{
    constructor(name,age,gender){
        super(name,age);           //super()，代表超类构造函数
        this.gender = gender;
    }

    getGender(){
        return this.gender;
    }

    getSuperName(){
        return super.getName();     //super，代表超类的prototype对象 Parent2.prototype
    }

    getSuperAge(){
        return super.age;           //注意，super代表超类的prototype对象，不是超类的this对象，所以super.age返回的将会是undefined
    }
}

let parent2 = new Parent2('Bob',33);
let child2 = new Child2('Jack',3,'boy');
console.log(parent2.getName());     //Bob
console.log(parent2.getAge());      //33
console.log(child2.getName());      //Jack
console.log(child2.getAge());       //3
console.log(child2.getGender());    //boy
console.log(child2.getSuperName()); //Jack
console.log(child2.getSuperAge());  //undefined

//这样写，语义增强了，也更加简洁了

//子类还可以继承父类的静态方法
class A{
    constructor(){
        
    }
    //静态方法，返回类名称
    static getName(){            
        return this.name;
    }
}

class B extends A{
    constructor(){

    }
}

console.log(A.getName());        //A
console.log(B.getName());        //B，this指向的是当前执行时的上下文环境，所以是B

//在静态方法中，super指向的不再是超类的prototype对象，而是超类本身
class ClassA{
    constructor(){
        this.name = "parent";
    }

    static getName(){
        return this.name;     //返回类名称ClassA
    }

    getName(){
        return this.name;     //返回this对象的属性name的值parent
    }
}

class ClassB extends ClassA{
    constructor(){
        super();
    }

    static getSuperName(){
        return super.getName();
    }

    getSuperName(){
        return super.getName();
    }
}

let classA = new ClassA();
let classB = new ClassB();
console.log(classA.getName());     //parent
console.log(ClassA.getName());     //ClassA
console.log(classB.getSuperName());//parent
console.log(ClassB.getSuperName());//ClassB，静态方法中的super指向的是超类

//注意，使用super，必须明确super是一个构造函数，还是一个对象
class Parent3{
    constructor(){

    }
}

class Child3 extends Parent3{
    constructor(){
        super();
    }

    // getSuper(){
    //     //SyntaxError: 'super' keyword unexpected here
    //     console.log(super);         //这样写，不明确super是什么，所以语法上会报错。
    // }
}

//Object.getPrototypeOf()方法，可以用来判断一个类是否继承于另一个类
class Foo{
    constructor(foo){
        this.Foo = foo;
    }
}

class Bar extends Foo{
    constructor(foo, bar){
        super(foo);
        this.Bar = bar;
    }
}

class Baz extends Bar{
    constructor(foo,bar,baz){
        super(foo,bar);
        this.Baz = baz;
    }
}

console.log(Object.getPrototypeOf(Baz) === Bar);    //true
console.log(Object.getPrototypeOf(Bar) === Foo);    //true
console.log(Object.getPrototypeOf(Baz) === Foo);    //false，继承关系，是逐级的，不能跨级