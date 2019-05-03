const co = require("co");    //generator自动流控制，利用Promise实现
const readFile = require("fs-readfile-promise");      //返回Promise对象的文件读取模块
const basedir = './11 asynchronous';
const fs = require('fs');

{
    function* gen(){
        let res1 = yield readFile(`${basedir}/assets/e.txt`);
        console.log(res1.toString());
        let res2 = yield readFile(`${basedir}/assets/f.txt`);
        console.log(res2.toString());
        let res3 = yield readFile(`${basedir}/assets/h.txt`);
        console.log(res3.toString());
    }

    co(gen);       //co模块，自动控制gen方法。

    //co模块，可以让你不用编写自动控制器。
    //co方法返回的是一个Promise对象

    co(gen).then(()=>console.log("gen方法执行完毕。"));
    //在gen方法执行完毕后，co状态会变成resolved，执行then方法。
   
}

{
    /*
    co模块的原理
    Generator是一个异步操作的容器，当异步操作有了结果，就会调用next()交回执行权。
    回调函数可以做到这一点，将异步操作包装成Thunk函数，Thunk函数的第一个参数就是回调函数，
    在回调函数中执行next()，交回执行权。
    Promise对象可以做到这一点，当异步操作有了结果，就会在then()中调用next()方法，交回执行权。
    co模块其实就是将Thunk函数自动执行器和Promise对象自动执行器包装成一个模块。
    */

    //深入了解co原理
    let gen = function* (){
        let f1 = yield readFile(`${basedir}/assets/e.txt`);
        console.log(f1);
        let f2 = yield readFile(`${basedir}/assets/f.txt`);
        console.log(f2);
        let f3 = yield readFile(`${basedir}/assets/h.txt`);
        console.log(f3);
    }

    let g = gen();

    let res1 = g.next();
    res1.value.then((data)=>{
        let res2 = g.next(data);
        res2.value.then(data=>{
            let res3 = g.next(data);
            res3.value.then(data=>{
                g.next(data);
            });
        });
    });
    //其实就是用then方法，在回调函数中执行next()。
    //理解这一点，其实就可以写一个执行器了
    
    function run(gen){
        let g = gen();

        function next(data=null){
            let res = g.next(data);
            if(res.done) return;
            res.value.then(d=>{
                next(d);
            });
        }

        next();
    }
    run(gen);
}

{
    //co处理并发操作，即允许某些操作同时进行，等到他们全部完成，才进行下一步。
    //要把把发的操作都放在数组或者对象的里面，跟在yield语句的后面。
    co(function* (){
        let res = yield [readFile(`${basedir}/assets/e.txt`),
        readFile(`${basedir}/assets/f.txt`),
        readFile(`${basedir}/assets/h.txt`)];
        console.log(res.map(data=>data.toString()));
    });

    co(function*(){
        let res = yield{
            1:readFile(`${basedir}/assets/e.txt`),
            2:readFile(`${basedir}/assets/f.txt`),
            3:readFile(`${basedir}/assets/h.txt`)
        };
        for(let value of gen(res)){
            console.log(value);
        }
    });

    function* gen(obj){
        for(var i in obj){
            yield obj[i].toString();
        }
    }   
}
