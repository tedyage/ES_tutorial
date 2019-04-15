/*
Set
*/

{
    //Set类似于数组，但是Set内部的成员是不能重复的。
    let set = new Set();
    //Set本身也是一个构造函数，用于生成Set对象

    [2,3,5,4,5,2,2].forEach((e)=>set.add(e));
    console.log(set);   //2,3,4,5

    //Set构造函数可以将数组(或者其它具有iterator接口的数据结构)作为参数初始化Set对象
    let set2 = new Set([1,2,3,4,4]);
    console.log(set2); //1,2,3,4

    //Set构造函数可以将字符串作为参数初始化Set对象
    let set3 = new Set('abbdc');
    console.log(set3)   //a b d c

    //Set主要用于为数组或者字符串排重
    //在Set中,NaN值是可以相等的，即NaN===NaN是成立的
    let set4 = new Set([NaN,NaN]);
    console.log(set4);   //NaN

}

{
    //Set对象的属性：constructor/size
    //Set对象的方法：add(x)/delete(x)/has(x)/clear()
    //x是key值
    
    //Array.from(new Set())，可以用于将Set对象转化为数组，
    //数组排重的方法。
    var arr = [1,2,3,3,3,4,4];
    arr = Array.from(new Set(arr));
    console.log("arr is "+ arr);  //1,2,3,4
}