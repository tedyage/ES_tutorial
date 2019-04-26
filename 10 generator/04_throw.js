/*
Generator.prototype.throw()
Generator函数返回遍历器对象，都有一个throw方法，可以在函数体外抛出异常，在函数体内捕获异常
*/

{
    function* foo(){
        try{
            yield;
        }catch(e){
            console.error('内部捕获',e);
        }
    }

    let i = foo();   //将遍历器指针赋给i。
    i.next();        //函数执行开始，到yield表达式暂停。

    try{
        i.throw('a');    //函数直行进入了try代码块内，所以函数体内的try/catch可以捕获到a这个异常。
        i.throw('b');    //由于foo函数内部的catch，已经捕获了a异常，所以不会再捕获其他异常了。所以b异常会被抛出到外部。
    }catch(e){
        console.error("外部捕获",e);
    }
    //throw方法可以接受一个参数，该参数就是catch捕获的异常信息，所以建议用Error对象作为throw方法的参数。
}

{
    //注意，区分遍历器对象的throw()方法，和全局的throw命令。
    //遍历器对象执行throw方法，会被generator函数的内部catch捕获，
    //全局的throw命令，只能被全局的catch捕获。

    function* f(){
        while(true){
            try{
                yield;
            }catch(e){
                if(e!='a') throw e;           
                console.error('内部捕获',e);
            }
        }
    }

    let g = f();
    g.next();

    try{
        throw new Error('a');    //外部捕获 Error: a；throw命令，只能被外部捕获
    }catch(e){
        console.error('外部捕获',e)
    }
}

{
    //如果generator函数体内没有写try/catch捕获异常的话，
    //执行此函数时出现的异常就会被外部的try/catch捕获到

    function* f(){
        while(true){
            yield;
            console.log('123');
        }
    }

    let g = f();
    g.next();

    try{
        g.throw(new Error('abc'));
    }catch(e){
        console.error('外部捕获',e);
    }
}

{
    //throw方法被generator函数内部catch捕获了之后，如果后面的代码还有yield表达式的话，
    //会被附带执行的。也就是，catch捕获异常会附带执行一次next()

    function* f(){
        try{
            yield console.log('a');
        }catch(e){
            console.error('内部捕获',e);
        }
        yield console.log('b');
        yield console.log('c');
    }

    let g = f();
    g.next();     //a
    g.throw(new Error('error'));    //内部捕获，Error：error，b。内部捕获异常之后，附带执行next(),输出b
    g.next();     //c         //函数内部try/catch处理异常，不会影响到函数的便利执行，依然会输出c。
}

{
    //Generator函数内部捕获错误的机制，大大的方便了对异步函数执行出错的处理，
    //多个yield表达式，可以只用一个try/catch代码来捕获错误。
    //替代了过去多个异步方法，要写多个错误处理回调函数来处理错误的方式。
}

{
    //Generator函数体外的异常可以在函数体内捕获，同样，
    //Generator函数体内的异常也可以在函数体外捕获。
    function* f(){
        let x = yield 3;
        let y = x.toUpperCase();
        yield y;
    }

    let g = f();
    g.next();       //{value:3;done:false}

    try{
        g.next(10);
    }catch(e){
        console.error(e.message);   //x.toUpperCase() is not a function
    }
    //将10作为第一个yield表达式的返回值，赋给x，
    //而此时x是Number类型，所以，执行x.toUpperCase()就会报错。
}