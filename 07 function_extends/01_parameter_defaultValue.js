/*
函数参数默认值
*/
{
    //在ES6以前，设定函数参数的默认值的写法是这样的
    function f(x,y){
        if(typeof y === 'undefined'){
            y = "World";
        }
        console.log(x+' '+y);
    }

    //如果不传y
    f("Hello");           //Hello World
    //如果传y
    f('Hello',"China");   //Hello China
    f('Hello',null);      //Hello null
    f('Hello','');        //Hello

    //ES6提供了参数默认值，在参数作用域中为参数赋值
    function f1(x='Hello',y='World'){
        console.log(x+' '+y);
    }

    //如果不传值
    f1()                    //Hello World
    //如果传x，或传y
    f1("yellow");           //yellow World   
    f1(undefined,"China");  //Hello China
}

{
    //不可在函数体内对函数参数，再次声明，否则报错
    try{
        function f(x,y=0){
            let x = 2;                //参数x在函数体内被再次声明
            let y = 1;
            return x+y;
        }

        f(1);

    }catch(e){
        console.error(e.message);      //Identifier 'x' has already been declared.
    }

    //函数参数不可重复生命，否则会报错
    try{
        // function f(x,x=0,y=1){         //参数名x重复
        //     console.log(x+y);
        // }

        // f(3);
    }catch(e){
        console.error(e.message);       //Duplicate parameter name not allowed in this context
    }
}

{
    //函数参数默认值不是直接传值，而是在每次调用方法时，动态计算默认值表达式的值。
    let x = 99;

    function f(p=x+1){
        console.log("p is "+p);
    }

    f();              //x+1是100，所以输出100
    x=100;
    f();              //x+1是101，所以输出101
}