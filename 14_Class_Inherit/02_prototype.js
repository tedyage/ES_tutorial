/*
prototype属性和__proto__属性
*/

/*
在ES5中，每一个对象，都有一个__proto__属性，
指向对应的构造函数的prototype属性
*/

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

function Child(name,age,gender){
    //继承属性，也可以用Parent.apply(this,[name,age])
    Parent.call(this,name,age);
    this.gender = gender;
}   

Child.prototype = new Parent();
Child.prototype.constructor = Child;

Child.prototype.getGender = function(){
    return this.gender;
}
//子类的原型对象的__proto__属性，指向的是超类的原型对象
console.log(Child.prototype.__proto__===Parent.prototype)       

/*
在ES6中，class语法糖，同样拥有__proto__属性，和prototype属性。
对象的__proto__属性，表示构造函数的继承，指向父类。
子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性
*/

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
        super(name,age);           
        this.gender = gender;
    }

    getGender(){
        return this.gender;
    }
}

//子类的__proto__属性，表示构造函数的继承，指向父类
console.log(Child2.__proto__===Parent2)
//子类的原型对象的__proto__属性，表示方法的继承，指向父类的原型对象
console.log(Child2.prototype.__proto__===Parent2.prototype);

//这样的结果，是因为类的继承是按照下面的模式实现的。
class A{
    constructor(){}

    getName(){
        console.log("Hello World");
    }
}

class B {
    constructor(){}
}

//将A的prototype对象设置到B的prototype的__proto__属性上
Object.setPrototypeOf(B.prototype,A.prototype);
console.log("B.prototype.__proto__ === A.prototype is "+(B.prototype.__proto__ === A.prototype));
//将B.__proto__指向A
Object.setPrototypeOf(B,A);
console.log("B.__proto__ === A is "+(B.__proto__ === A));

let b= new B();
b.getName();       //Hello World

/*
对于B.__proto__ === A，可以理解为：
作为一个对象，B的原型指向A。
对于B.prototype.__proto__ === A.prototype，可以理解为：
作为一个构造函数，B的原型对象是A的原型对象的一个实例
*/

//结合类实例的__proto__属性，指向的事类的prototype对象这一点，可以得出：
console.log(b.__proto__ === B.prototype) ;     //true
console.log(b.__proto__.__proto__ === A.prototype)   //true
//子类实例的原型的原型，指向的是超类的原型对象，是超类原型对象的实例
//可以通过修改子类实例的原型的原型，来修改父类的方法

b.__proto__.__proto__.getName = function(){
    console.log("Hello World2");
}
let a = new A();
a.getName();       //Hello World2，修改了超类原型对象内部的方法



