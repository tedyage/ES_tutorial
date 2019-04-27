/*
Generator.prototype.return()
此方法返回给定的值，并且终结遍历Generator函数
*/

{
    function* f(){
        yield 1;
        yield 2;
        yield 3;
    }

    let g = f();

    console.log(g.next());  //{"value":1,"done":false}
    console.log(g.next());  //{"value":2,"done":false}
    console.log(g.next());  //{"value":3,"done":false}
    console.log(g.next());  //{"value":undefined,"done":true}

    let g1 = f();

    console.log(g1.next());  //{"value":1,"done":false}
    console.log(g1.return("finished"));   //{"value":"finished","done":true};
    console.log(g1.next());  //{"value":undefined,"done":true}
    //g1遍历器，在执行return方法时，遍历器输出对象就是return方法所传的参数，
    //同时Generator方法停止遍历，遍历器对象的done属性变为true
}

{
    //如果Generator函数内部有try/finally代码块，且当前执行代码已经在try代码块之中，
    //在调用return方法时，会在执行finally代码之后，再执行return方法。
    function* f(){
        yield 1;
        try{
            yield 2;
            yield 3;
        }finally{
            yield 4;
            yield 5;
        }
        yield 6;
    }

    let g= f();
    console.log(g.next())   //{"value":1,"done":false}
    console.log(g.next())  //{"value":2,"done":false}
    console.log(g.next())  //{"value":3,"done":false}
    console.log(g.return(7))  //{"value":4,"done":false}
    console.log(g.next())  //{"value":5,"done":false}
    console.log(g.next())  //{"value":7,"done":true}
}