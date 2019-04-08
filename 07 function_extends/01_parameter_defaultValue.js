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

{
    //函数参数默认值和结构变量默认值结合使用
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
}

{
    //函数默认值的位置
    {
        //一般情况下，拥有默认值的参数，都是放在参数群的末尾，
        //这样做是为了方便确定哪些参数可以省略传值.
        function f(x,y,z=2){
            console.log([x,y,z]);
        }
    
        f('a',1);
    
        //如果不放在末尾，则可能不会打到参数默认值的效果，有默认值的参数很可能还需要赋值。
        function f1(x,y=3,z){
            console.log([x,y,z]);
        }
    
        f1(1,2);         //[1,2,undefined]
        //f1(1,,2);      //报错，Unexpected token ,
        f1(undefined,2,undefined);   //[undefined,2,undefined]
        f1(1,undefined,2) //[1,3,2]
        //如果有默认值的参数不在参数的末尾，则无法省略赋值，除非赋值undefined
        //对于有默认值的参数，如果赋值undefined，则该参数仍等于默认值，
        //如果赋值null，则该参数等于null。
        f1(1,null,2)      //[1,null,2]
    }
}

{
    //函数的length属性
    //length属性的返回值，等于调用函数时，传入参数的个数，
    //所以对于有默认值的参数，length会将其排除出去。

    console.log((function f(x,y,z=2){
        console.log(x,y,z);
    }).length);           //2

    //对于默认值参数没有放在末尾的情况，默认值参数后面的参数也不会计入length当中
    console.log((function(x,y=2,z){
        console.log(x,y,z);
    }).length);           //1

    //对于rest参数，length也会将其排除在外
    console.log((function(x,...args){
        console.log(x,args);
    }).length);           //1
}

{
    //参数作用域
    //一旦设置了参数默认值，函数进行声明初始化时，参数会形成一个单独的作用域，
    //等到初始化结束，这个作用域就会消失。

    {
        var x= 1;

        function f(x,y = x){
            console.log("y is "+y);      //2
        }
        f(2);
        //以上例子中，在执行f函数时，参数形成了单独的作用域，在作用域中，
        //x被赋值为2，y指向x的值，所以y的值也是2，而不是全局变量1.
    }
    

    {
        let x = 1;
        function f1(y = x){
            let x = 2;
            console.log("y is "+y);         //1
        }
        f1();
        //以上例子中，在执行f1函数时，参数形成了单独的作用域，在作用域中，
        //参数y指向参数x，而参数x在该作用域内没有被赋值，故指向全局作用域，赋值为1，
        //所以y的值是1；
    }
    
    {
        try{
            function f(y=x1){
                let x1 = 2;
                console.log("y is "+y);    
            }
            f();   
            //以上例子中，执行f函数时，参数形成了单独的作用域，在作用域中，
            //参数y指向参数x1，而参数x在该作用域内没有被赋值，故指向全局作用域，
            //而全局作用域没有声明变量x1，所以x1未声明，所以会报错。
        }catch(e){
            console.error(e.message); //ReferenceError: x1 is not defined
        }
        
    }

    {
        try{
            function f(x1=x1){

            }
            
            f();    
            //在参数单独的作用域中，声明的变量x1指向自己，但是x1没有赋值
            //因为暂时性死区的原因，所以会报错
        }catch(e){
            console.error(e.message);  //ReferenceError: x1 is not defined
        }
        
    }
}

{
    //应用场景
    //利用参数默认值，可以指定某函数参数不可省略，如果省略，抛出异常
    try{
        function throwIfMissing(){
            throw new Error("Miss Parameter");
        }

        function f(mustBeProvided = throwIfMissing()){
            return mustBeProvided;
        }

        console.log(f());
    }catch(e){
        console.error(e.message);   //Miss Parameter
    }
}