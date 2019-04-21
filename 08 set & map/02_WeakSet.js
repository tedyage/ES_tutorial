/*
WeakSet结构与Set类似，
区别就是：
WeakSet的成员只能是对象，不能是值。
WeakSet里面的引用，都不计入垃圾回收机制，
即如果其它对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，
也就是说，WeakSet的成员可能会随时消失，所以WeakSet内部成员的个数是不定的，
所以WeakSet是不可遍历的。
*/

{
    //WeakSet的构造函数，参数通常是对象的数组
    var a = {id:1,name:'Ming'};
    var b = {id:2,name:'Qing'};
    const ws = new WeakSet([a,b]);
    
    try{
        let arr = [1,2,3];
        const ws2 = new WeakMap(arr);  //数组内部成员必须是对象
    }catch(e){
        console.error(e);   //Invalid value used in weak set
    }
}

{
    //WeakSet对象有以下三个方法
    {
        //add(value)方法，添加新的成员，方法返回的依然是WeakSet对象
        let ws =new WeakSet();
        let obj = {id:1,name:'obj'};
        let foo = {id:2,name:'foo'};
        ws.add(obj).add(foo);
    }

    {
        //has(value)方法，判断是否存在某成员，方法返回的是布尔值
        let ws =new WeakSet();
        let obj = {id:1,name:'obj'};
        let foo = {id:2,name:'foo'};
        ws.add(obj);
        console.log(ws.has(obj));     //true
        console.log(ws.has(foo));     //false
    }

    {
        //delete(value)方法，用于删除内部某个成员，方法没有返回值
        let ws =new WeakSet();
        let obj = {id:1,name:'obj'};
        let foo = {id:2,name:'foo'};
        ws.add(obj);
        ws.delete(obj);
        console.log(ws.has(obj));      //false
    }
}

{
    /*
    使用WeakSet的好处，就是WeakSet的内部成员的引用不计入垃圾回收机制，
    则，一旦不再有任何的引用，垃圾回收机制就会回收这个成员，所以不会出现
    手动删除某个实例成员时内存泄漏的情况。
    */
}