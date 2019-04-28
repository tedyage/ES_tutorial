/*
Generator函数的this
Generator函数返回的永远是遍历器对象，而不是this对象，遍历器对象可以继承函数的Prototype里的属性
Generator函数不能用作构造函数，不能和new一起初始化对象，
Generator函数内部的this对象添加的属性，不会在遍历器对象上看到。
*/

{
    function* f(){
        this.foo = 'hello';
    }

    try{
        let gen = new f();
        console.log(gen.foo);   
    }catch(e){
        console.error(e.message);   //f is not a constructor
    }    

    let gen1 = f();
    console.log(gen1.foo);    //undefined
}

{
    //如果想要实现Generator函数既可以正常返回遍历器对象，
    //同时又可以正常地获得函数里面的this。
    //可以采用Generator函数调用call方法，初始化外部的一个空对象

    var obj = {};

    function* f(){        
        this.foo = "Hello";
        yield "a";   
        yield this.bar = "World";     
    }

    var gen = f.call(obj);     //将this对象绑定到obj上，然后调用f方法，将返回值遍历器赋给gen。

    console.log(gen.next());   //{"value":'a',"done":false}
    console.log(gen.next());   //{"value":'World',"done":false}，执行完此next()之后，obj对象新绑定了bar属性
    console.log(obj.foo);      //Hello
    console.log(obj.bar);      //World   
}

{
    //上面代码，执行generator函数的对象时gen，而函数生成的对象实例时obj，有没有方法可以将两者统一呢？
    //有一种方法，就是将方法的prototype替换掉obj。
    //因为Generator函数生成的遍历器对象，也是函数的实例，可以继承函数的Prototype内部的属性

    function* f(){
        this.foo = "Hello";
        yield "a";
        yield this.bar = "World";
        yield this.baz = "!";
    }

    let gen = f.call(f.prototype);

    console.log(gen.next());   //{"value":"Hello","done":false}
    console.log(gen.next());   //{"value":"World","done":false}
    console.log(gen.next());   //{"value":"!","done":false}
    console.log(gen.next());   //{"value":undefined,"done":true}

    console.log(gen.foo);      //Hello
    console.log(gen.bar);      //World
    console.log(gen.baz);      //!

    //再将Generator函数封装成一个函数，这样就可以使用new，来初始化对象了。
    function Gen(){
        return f.call(f.prototype);
    };

    let gen2 = new Gen();

    console.log(gen2.next());   //{"value":"Hello","done":false}
    console.log(gen2.next());   //{"value":"World","done":false}
    console.log(gen2.next());   //{"value":"!","done":false}
    console.log(gen2.next());   //{"value":undefined,"done":true}

    console.log(gen2.foo);      //Hello
    console.log(gen2.bar);      //World
    console.log(gen2.baz);      //!
}