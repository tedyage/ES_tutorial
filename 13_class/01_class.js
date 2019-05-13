/*
01 简介
*/

{
    //ES5中，生成实例对象的传统方法是构造函数。
    function Point(x,y){
        this.x = x;               //定义Point类对象的属性
        this.y = y;
    }

    Point.prototype.toString = function(){
        return `(${this.x},${this.y})`;   //定义Point类对象的toString方法
    }

    var p = new Point(3,5);    
    console.log(p.toString());     //(3,5)

    //ES6引入了Class，通过它可以定义类
    class Point2{
        constructor(x,y){         //构造函数，每个类必须有一个
            this.x = x;
            this.y = y;
        }

        toString() {               //定义“类”的方法的时候，前面不需要加上function关键字，直接把函数定义放进去就可以了。
            return `(${this.x},${this.y})`;
        }
                                    //方法与方法之间不需要逗号分隔，加了会报错。
        toString2(){
            return `(${this.y},${this.x})`;
        }
    }

    var p1 = new Point2(3,5);
    console.log(p1.toString());      //(3,5)

    /*ES6的class可以看做只是一个语法糖，
    新的写法让对象原型的写法更清晰，
    更像面向对象编程的语法而已。
    */


    console.log(typeof Point2)          //function
    console.log(Point2 === Point2.prototype.constructor)   //true
    //ES6的类，可以看做构造函数的另一种写法。
    //类型的数据类型，就是函数，类本身就指向的是构造函数

    var p2 = new Point2(3,5);
    console.log(p2.toString === Point2.prototype.toString)  //true

    /*
    由于类的方法都定义在prototype对象上面，
    所以类的新方法也可以添加在prototype对象上。
    用Object.assign方法可以向类添加多个方法。
    */

    Object.assign(Point2.prototype,{
        func1(){console.log('func1')},
        func2(){console.log('func2')}
    })
    //Object.assign(target,source)，所用是将source当中的可枚举属性复制到target对象中。

    var p3 = new Point2(4,6);
    p3.func1();       //func1
    p3.func2();       //func2

    /*
    class内部所有定义的方法，都是不可枚举的。
    这一点与ES5中定义类的方法，是不一致的
    */
    console.log(Object.keys(Point2.prototype));     //["func1","func2"]，没有toString()方法
    console.log(Object.keys(Point.prototype));      //["toString"]
}

{
    /*
    constructor方法是类的默认方法，
    当通过new命令生成对象实例时，会自动调用constructor方法。
    一个类必须有constructor方法，如果没有现实定义，
    类会默认添加一个空的constructor
    */

    class Foo{
        constructor(){

        }
    }

    //constructor方法默认返回实例对象this。
    //但是也可以指定返回另外一个对象，通过手动修改constructor内部的返回值

    class Foo2{
        constructor(){
            return Object.create(null);
        }
    }

    var foo = new Foo();
    var foo2 = new Foo2();
    console.log(foo instanceof Foo)            //true
    console.log(foo.__proto__);                //Object{consturctor:},Foo的原型对象
    console.log(foo2 instanceof Foo2);         //false
    console.log(foo2.__proto__)                //undefined

    //类必须使用new调用，否则会报错。这也是class的与ES5中构造函数的区别
    //var foo3 = Foo();              
    //TypeError: Class constructor Foo cannot be invoked without 'new'
}

{
    //类的实例

    /*
    实例的属性，除非显示定义在其本身this，否则都是定义在原型上
    */

    class Point3 {
        constructor(x,y){
            this.x = x;
            this.y = y;
        }

        fun(){
            return `(${this.x},${this.y})`;
        }
    }

    var p3 = new Point3(3,5);
    console.log(p3.hasOwnProperty('x'));      //true
    console.log(p3.hasOwnProperty('y'));      //true
    console.log(p3.hasOwnProperty('fun'));    //false
    console.log(p3.__proto__.hasOwnProperty('fun')); //true

    //类的所有实例，共享一个原型对象prototype
    var p4 = new Point3(5,3);
    console.log(p3.__proto__);      //Point3的原型对象
    console.log(p4.__proto__);      //Point3的原型对象
    console.log(p3.__proto__===p3.__proto__);   //true
    //生产环境中，我们可以使用Object.getPrototypeOf方法来获取实例对象的原型
    console.log(Object.getPrototypeOf(p4));   //Point3的原型对象
}