/*
Generator函数
*/

/*
协程（co_routine）处理异步任务的大体方式如下：
1.协程A开始执行。
2.协程A执行到第一阶段，协程暂停，执行权转移到协程B。
3.（一段时间后）协程B将执行权交还给A。
4.协程A恢复运行。
*/

const fs = require('fs');   //读取文件模块
const fetch = require("node-fetch");   //一个轻量级的发送http请求模块
const thunkify = require("thunkify");  //Thunkify模块，可用来做Generator协程流控制
const baseDir = './11 asynchronous';

{
    //Generator函数就是一个封装的异步任务，或者说是异步任务的容器。
    //Generator函数可以暂停执行和恢复执行，这是他能封装异步任务的根本原因。
    //Generator函数体内外的数据交换机制
    function* genJob(x){
        let y = yield x+2;    //函数执行到x+2，暂停执行，
        return y+1;
    }

    let gen = genJob(2);
    let value = gen.next().value;   //调用gen.next()开始运行此函数。   {"value":4,"done":false}
    console.log("value is "+value);
    value = gen.next(value).value;  //再次调用gen.next()，恢复函数执行。   将value当作参数调用next()，作为上一个阶段执行的结果，再一次被y接收
    console.log("value is "+value);

    //Generator函数的错误捕获机制
    function* genJob2(x){
        try{
            let y = yield x+2;
            return y;
        }catch(e){
            console.error(e.message);    //出错了
        }
    }

    let gen2 = genJob2(2);
    gen2.next();        //{"value":4,"done":false}
    gen2.throw(new Error('出错了'));
    /*
    在Generator函数体外抛出的错误，可以被函数体内的try...catch捕获到。
    这意味着，执行代码与错误处理代码，可以实现时间和空间的分离，这对异步编程来说是很重要的。
    */
}

{
    //异步任务的封装
    function* gen(url){
        let data = yield fetch(url);   //fetch(url)，发起http请求，请求url是参数url，返回Promise对象
        console.log(data);             //输出接口返回结果。
    }

    let g = gen("https://api.github.com/users/github");
    let result = g.next();    //result.value指向一个Promise对象

    result.value.then((data)=>{
        g.next(data.json());         //将结果返回结果传入gen方法，恢复执行
    });

    /*
    可以看出，Generator对异步操作的表示很整洁，
    但是流程管理，却不是很方便，总是要自己制定在哪里调用next()方法
    */
}

{
    //Thunkify模块，可以实现Generator函数的自动流程管理。
    //Generator函数可以自动运行。
    let readFileThunk = thunkify(fs.readFile);    //readFileThunk就是Thunk转换的函数，它返回的是一个只有回调函数参数的方法

    function* gen(){
        try{
            let res1 = yield readFileThunk(`${baseDir}/assets/e.txt`);
            console.log(res1.toString());
            let res2 = yield readFileThunk(`${baseDir}/assets/f.txt`);
            console.log(res2.toString());
            let res3 = yield readFileThunk(`${baseDir}/assets/g.txt`);
            console.log(res3.toString());
        }catch(e){
            console.error(e.message);
        }        
    }

    //我们先看看如何手动控制执行这个gen函数
    let g = gen();
    let res1 = g.next();    //res1的value属性其实就是一个function，里面只会有一个参数，即回调函数

    res1.value(function(err,data){
        if(err) throw err;
        let res2 = g.next(data);
        res2.value(function(err,data){
            if(err) throw err;
            let res3 = g.next(data);
            res3.value(function(err,data){
                if(err) throw err;
                g.next(data);
            });
        });
    });

    //以上可以看出，Generator函数（协程）的执行过程，其实就是在同一个回调函数，反复将value属性，传入next()方法。
    //这使得我们可以用递归自动完成这个过程。

    //写一个run方法，内部包含一个next方法，并且在run内部，递归调用next方法
    function run(fn){
        let gen = fn();
        //next函数，就是Thunk的回调函数。在回调函数里调用gen.next()方法。然后判断Generator函数是否结束
        //如果没结束，就将next在此传入thunk函数。
        function next(err,data){
            let result = gen.next(data);
            if(result.done) return;
            result.value(next);
        }

        next();
    }

    //有了这个执行器，不管Generator函数内部有多少异步操作，
    //直接将此Generator函数传入run函数即可
    //注意：Generator内部的每个函数都必须是Thunk函数，否则value里的参数不一定是回调函数，会报错。
    run(gen);
}