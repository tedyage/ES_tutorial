/*
iterator接口的运用场合
*/

{
    //1.解构赋值
    //不只是数据结构和对象结构可以做到解构赋值，
    //实际上拥有iterator接口的数据接口都可以做到解构赋值

    let set = new Set().add('a').add('b').add('c');
    let [x,y,z] = set;
    console.log("x is "+x);     //a
    console.log("y is "+y);     //b
    console.log("z is "+z);     //c

    let[x1,...args] = set;
    console.log("x1 is "+x1);     //a
    console.log("args is "+args); //['b','c']
    
    let map = new Map().set(1,'a').set(2,'b').set(3,'c');
    let [foo,bar,baz] = map;
    console.log(foo);          //[1,"a"]
    console.log(bar);          //[2,"b"]
    console.log(baz);          //[3,"c"]

    let [fir,...rest] = map;
    console.log(fir);          //[1,"a"]
    console.log(rest);         //[[2,"b"],[3,"c"]]

    //对于数组，Map，Set数据结构，进行解构赋值时，会调用Symbol.iterator方法
}

{
    //扩展运算符
    //任何拥有iterator接口的数据结构，都可以使用扩展运算符
    let str = 'hello world';
    console.log(...str);     //h e l l o  w o r l d
    let arr = [1,2,3,4,5];
    console.log(...arr);     //1 2 3 4 5
    let set = new Set([1,'a',true]);
    console.log(...set) ;     //1 a true
    let map = new Map([
        [{foo:1},"foo"],
        ["bar","baz"]
    ]);
    console.log(...map);      //[{foo:1}, "foo"] ["bar","baz"]
}

{
    //实际上，任何以数组作为参数的场合，都调用了遍历器
    let arr = [1,2,3];
    let arr1 = Array.from(arr);   //调用了arr的遍历器，将value加入到arr1中

    let map = new Map([
        [1,'a'],[2,"b"]
    ]);

    let set = new Set(['a','b','c']);
    //将数组作为参数初始化Map和Set对象，调用了数组的遍历器方法

    let p1 = new Promise((resolve,reject)=>resolve('data1'));
    let p2 = new Promise((resolve,reject)=>resolve('data2'));
    Promise.all([p1,p2]).then(data=>console.log(data));
    Promise.race([p1,p2]).then(data=>console.log(data));
    //将数组作为参数调用Promise.all()或者Promise.race()的时候，调用了数组的遍历器方法
}