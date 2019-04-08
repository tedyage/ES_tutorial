/*
函数默认值与解构赋值默认值一起使用
*/

{
    function f({x,y=0}){
        console.log(x,y);
    }

    f({x:1});       //1 0
    f({});          //undefined,0
    try{
        f();            
    }catch(e){
        console.error(e.message)  //Can not destructure property 'x' of undefined of null
    }   
    //函数参数没有赋默认值，只是在对象内部的结构参数中赋了默认值，
    //如果函数参数是个空对象，则可以获取到结构参数x,y的值，
    //如果函数没有参数，则参数为undefined，参数x和y就不会被声明，所以会报错。
}

{
    //对比一下下面两个方法的输出结果有何区别
    function m1({x=0,y=0}={}){
        return [x,y];
    }

    function m2({x,y}={x:0,y:0}){
        return [x,y];
    }

    console.log(m1());           //[0,0]
    console.log(m1({}));         //[0,0]
    console.log(m2());           //[0,0]
    console.log(m2({}));         //[undefined,undefined]
    //m2是给函数参数赋了默认值，但是没有给内部解构变量赋默认值，
    //当执行m2({})时，函数参数被传入一个空对象，
    //而参数内部解构变量因为没有默认值，所以默认是undefined
}