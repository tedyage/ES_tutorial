/*
Map结构，类似于对象，也是键值对集合
区别在于：键的类型范围不再仅限于字符串，各种类型的值都可以当作键。
Object键值对的结构：字符串————值
Map键值对的结构：值————值
*/

{
    //定义一个Map实例，
    let map = new Map();
    map.set(1,"key is a number");
    map.set(true,"key is a boolean");
    map.set('p','key is a string');
    let o = {p:'hello'};
    map.set(o,"key is an object");

    console.log(map.get(1));  //key is a number
    console.log(map.get(true));  //key is a boolean
    console.log(map.get('p'));  //key is a string
    console.log(map.get(o));  //key is an object

    console.log(map.has(o));   //true
    console.log(map.has(2));   //false
    map.delete(o);
    console.log(map.has(o));   //false

    map.clear();

    //向Map对象添加成员要用set方法，
    //读取Map对象的内部成员要用get方法。
    //判断Map对象是否存在某成员要用has方法，
    //删除Map对象内某个成员用delete方法。
    //清空一个Map对象要用clear方法。

    //Map构造函数，可以接受一个数组作为参数。
    //该数组内部成员必须都是键值对的数组，即[["a","hello"],["b","world"]]
    let map2 = new Map([["name","tianzhiqiang"],["age","30"]]);

    console.log(map2.size);          //2
    console.log(map2.get("name"));   //tianzhiqiang
    console.log(map2.get("age"));    //30
    //map2中，有两个键：name和age，分别对应的值是：tianzhiqiang和30
    
    //事实上，任何一个具有Iterator接口，且每个内部成员都是双元素的数组的结构，
    //都可以被用作Map构造函数的参数，
    //也就是说，Set对象和Map对象也可以用来生成新的Map

    let set = new Set([['foo',1],['boo',2],['bar',3]]);
    let map3 = new Map(set);
    console.log(map3.get("foo"));  //1
    console.log(map3.get('boo'));  //2
    console.log(map3.get('bar'));  //3
}

{
    //如果对同一个键多次赋值，后面的值将覆盖前面的值
    let map = new Map();

    map.set(1,'abc').set(1,'def');
    console.log(map.get(1));  //def
    
    //如果读取一个未声明的键，返回的则是undefined
    console.log(map.get('asdfsf'));   //undefined
}

{
    //Map对象提供了3个遍历器，keys()/values()/entries()
    //Map对象提供了1个遍历方法，forEach()

    //注意一点，Map的遍历顺序，就是插入顺序
    let map = new Map([["name","tianzhiqiang"],["age","30"]]);

    for(let key of map.keys()){
        console.log(key);   //name,age
    }

    for(let value of map.values()){
        console.log(value);  //tianzhiqiang,30
    }

    for(let [key,value] of map.entries()){
        console.log(key,value);   //name tianzhiqiang, age 30
    }

    
}