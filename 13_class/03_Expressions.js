/*
属性表达式&类表达式
*/

{
    //类的属性名，可以采用表达式
    let methodName = 'Foo';        //'Foo'就是属性名表达式

    class MyClass{
        constructor(){
            //...
        }

        [methodName](){            //如果去掉中括号，则此属性名为methodName
            console.log('foo')
        }
    }

    let myclass = new MyClass();
    myclass.Foo();                 //foo
}

{
    //类也可以使用表达式的形式定义。

    const MyClass = class Me{    
        constructor(){
            //...
        }

        getInnerClassName(){
            //返回Me类内部命名的名称。Me
            return Me.name;      
        }

        getOuterClassName(){
            //MyClass作为外部命名，只能在外部被访问，内部访问，默认返回内部命名名称Me
            return MyClass.name;  
        }
    }

    let myclass = new MyClass();  //在外部只可以使用外部命名MyClass，如果使用Me则会报错。
    try{        
        let me = new Me();            //ReferenceError: Me is not defined
    }catch(e){
        console.error(e.message||e);
    }
    
    console.log(myclass.getInnerClassName());  //Me
    console.log(myclass.getOuterClassName());  //Me

    /*
    如果没有用到内部命名，则可以省略内部命名
    */

    const MyClass2 = class{
        constructor(){
            //...
        }

        sayName(){
            console.log(MyClass2.name);
        }
    }

    let myclass2 = new MyClass2();
    myclass2.sayName();                        //MyClass2

    /*
    利用class表达式，可以立即初始化某个类的实例，
    区别于先定义类，再通过new关键字，初始化类的实例
    */
    let person = new class {
        constructor(name){
            this.name = name; 
        }

        sayName(){
            console.log(this.name);
        }
    }('张三');

    person.sayName()           //张三
}