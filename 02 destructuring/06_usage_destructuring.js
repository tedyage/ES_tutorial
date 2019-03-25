/*
解构赋值的用途
*/

//1.交换变量的值
{
    let a = 1,
        b = 2;
    [a,b] = [b,a]   //a与b的值进行交换
    console.log("a is "+a);   //a is 2
    console.log("b is "+b);   //b is 1

    //代替过去的变量值交换写法
    let x = 1,y=2;
    let temp;

    temp = x;
    x=y;
    y = temp;
    console.log("x is "+x);    //x is 2
    console.log("y is "+y);    //y is 1

}

//2.从函数返回多个值
{
    function example(){
        return [1,2,3];
    };
    //返回一个数组
    let [a,b,c] = example();
    console.log("a is "+a);
    console.log("b is "+b);
    console.log("c is "+c);

    function example2(){
        return{foo:1,bar:2};
    }
    //返回一个对象
    let {foo,bar} = example2();
    console.log("foo is "+foo);
    console.log("bar is "+bar);
}

//3.解构赋值可以方便的将一组参数与变量名对应起来
{
    //参数是一组有序的值
    function f1([x,y,z]){
        console.log(x);
        console.log(y);
        console.log(z);
    }
    f1([1,2,3]);

    //参数是一组无序的值
    function f2({x,y,z}){
        console.log(x);
        console.log(y);
        console.log(z);
    }
    f2({z:5,x:9,y:2});

}

//4.提取对象中的数据，尤其有用
{
    let data={
        id:34,
        status:'ok',
        data:[23,445]
    };

    let{id,status,data:number} = data;
    console.log("id is "+id);
    console.log("status is "+status);
    console.log("number is "+number);
}

//5.定义函数参数的默认值，避免在函数内部再写
//  foo = typeof foo === 'undefined'?'default':foo;
{
    function f1({a=1,b=2,c=3,d=4}={}){
        console.log("a is "+a);
        console.log("b is "+b);
        console.log("c is "+c);
        console.log("d is "+d);
    }

    f1();
}

//6.遍历Map结构
//Map结构原生支持遍历，配合变量的解构赋值，获取key/value就很方便
{
    let map = new Map(); //键值对对象
    console.log(Map.prototype.toString.call(map));

    map.set('first','hello');
    map.set('second','world');

    for(let [key,value] of map){
        console.log(key+" is "+value);
    }
}

//7.加载模块的指定写法，加载模块时，往往需要指定输入哪些方法，解构赋值是的输入语句非常清晰
{
    //const {SourceMapConsumer,SourceNode} = require('source-map');
}