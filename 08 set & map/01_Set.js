/*
Set
*/

{
    //Set类似于数组，但是Set内部的成员是不能重复的。
    let set = new Set();
    //Set本身也是一个构造函数，用于生成Set对象

    [2,3,5,4,5,2,2].forEach((e)=>set.add(e));
    console.log(set);   //存储的结构式键值对数组
    for(let i of set){
        console.log(`The value of set is ${i}`);   //2,3,5,4
    }

    //Set构造函数可以将数组(或者其它具有iterator接口的数据结构)作为参数初始化Set对象
    let set2 = new Set([1,2,3,4,4]);
    for(let i of set2){
        console.log(`The value of set2 is ${i}`);  //1,2,3,4
    }

    //Set构造函数可以将字符串作为参数初始化Set对象
    let set3 = new Set('abbdc');
    for (let i of set3){
        console.log(`The value of set3 is ${i}`);
    }

    //Set主要用于为数组或者字符串排重
    //在Set中,NaN值是可以相等的，即NaN===NaN是成立的
    let set4 = new Set([NaN,NaN]);
    for(let i of set4){
        console.log(`The value of set4 is ${i}`);     //NaN
    }
    
    let set5 = new Set([{},{}]);
    for(let i of set5){
        console.log(`The value of set5 is ${i}`);     //{},{}，
        //两个虽然都是空对象，但是由于它们指向的地址不同，所以不相等
    }

    //Array.from(new Set())，可以用于将Set对象转化为数组，
    //数组排重的方法。
    var arr = [1,2,3,3,3,4,4];
    arr = Array.from(new Set(arr));
    console.log("arr is "+ arr);  //1,2,3,4
}

{
    //Set对象的属性：constructor/size
    //Set对象的操作方法：   
    {
        //add(value)方法，添加某个值，返回Set本身
        let set = new Set();
        set.add('a').add('b').add('c').add(1).add('a');
        for(let i of set){
            console.log(`The value of set is ${i}`);
        }
    }

    {
        //delete(value)方法，返回一个布尔值，表示删除是否成功。
        let set = new Set();
        set.add('a').add('b').add('c').add(1).add('a');
        console.log(`set.delete('a') is ${set.delete('a')}`);   //true，a存在，所以可以删除
        console.log(`set.delete('d') is ${set.delete('d')}`);   //false，d不存在，所以执行删除时返回false
        let o = {name:'abc',age:15};
        set.add(o);
        console.log(`set.delete({name:'abc',age:15}) is ${set.delete({name:'abc',age:15})}`);  //false
        //虽然与对象o的属性一样，但是不是对象o，而是一个新的对象，所以无法删除。
        console.log(`set.delete(o) is ${set.delete(o)}`);  //true
    }

    {
        //has(value)，返回一个布尔值，表示该值是否是Set的成员
        let set = new Set();
        set.add('a').add('b').add('c').add(1).add('a');
        console.log(`set.has('a') is ${set.has('a')}`);   //true
        console.log(`set.has('d') is ${set.has('d')}`);   //false
    }

    {
        //clear()，没有返回值，清空所有成员
        let set = new Set();
        set.add('a').add('b').add('c').add(1).add('a');
        console.log(`The size of set is ${set.size}`);    //4
        set.clear();
        console.log(`The size of set is ${set.size}`);    //0
    }   
}

{
    //Set有四个遍历方法，用于遍历成员
    //keys(),values(),entries(),forEach()
    //Set便利的顺序，就是成员插入的顺序
    {
        //keys()，返回的是遍历对象，遍历所有的键值，
        //因为Set结构没有键名，只有键值，所以keys方法返回键值，
        //这于values()方法行为完全一致。
        let set = new Set(['red','green','blue']);

        for(let item of set.keys()){
            console.log(item);  //red,green,blue
        }
        //values()，返回的是遍历对象，遍历所有的键值
        for(let item of set.values()){
            console.log(item);  //red,green,blue
        }
    }

    //entries方法返回的遍历器，包括键名和键值，而键名与键值相等
    {
        let set = new Set(['red','green','blue']);

        for(let entry of set.entries()){
            console.log(entry);   //['red','red'],['green','green'],['blue','blue']
        }
    }

    //forEach方法用于遍历内部成员，并对每个成员执行某种操作，没有返回值
    {
        let set = new Set([1,4,9]);
        set.forEach((value,key)=>console.log(`key:value is ${key}:${value}`)); //1:1 4:4 9:9
    }
}

{
    //扩展运算符...，也可以用作Set结构
    let set = new Set([1,2,2,3,3,4]);
    let arr = [...set];    //[1,2,3,4]
    console.log(`arr is ${arr}`)  // arr is 1,2,3,4
}

{
    //运用Set，可以求得两个数组的并集，交际和差集
    let arr1 = [1,2,3];
    let arr2 = [2,3,4];

    let set1 = new Set(arr1);
    let set2 = new Set(arr2);

    let set3 = new Set([...set1,...set2]);
    console.log(`set3 is ${set3}`);  //set3 is 1,2,3,4  并集为1，2，3，4

    let set4 = new Set([...set1].filter(x=>set2.has(x)));
    console.log(`set4 is ${set4}`);  //set4 is 2,3   交集为2，3

    let set5 = new Set([...set1].filter(x=>!set2.has(x)));  //1   差集为1
}