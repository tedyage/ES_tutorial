/*
回调函数
*/

/*异步：就是指将一个任务分成2个阶段执行，
进行第一个阶段时，程序可以执行其他的任务，
等到第一个阶段返回了结果，再执行第二个阶段。
*/

/*
目前Javascript处理异步的方式有：回调函数/事件监听/发布&订阅/Promise对象/Generator方法
*/

const fs = require('fs');   //引用读取文件的对象
{
    //回调函数
    fs.readFile("./11 asynchronous/assets/a.txt","utf-8",function(err,data){
        if(err){
            console.error(err.message);
        }else{
            console.log(data);
        }
    });
    //Node约定，回调函数的第一个参数，必须是错误对象，如果没有错误，则该对象默认是null。
    //原因是第一阶段是读取问卷，执行完成之后，第一阶段的上下文环境已经结束了，
    //在这之后抛出的错误，原来的上下文亦无法捕捉，只能以参数形式传到第二阶段。
}

{
    fs.readFile("./11 asynchronous/assets/a.txt","utf-8",function(err,data){
        if(err){
            console.error(err.message);
        }else{
            console.log(data)
            fs.readFile("./11 asynchronous/assets/b.txt","utf-8",function(err,data){
                if(err){
                    console.error(err.message);
                }else{
                    console.log(data);
                }
            });
        }
    });

    //多重嵌套回调函数，代码不会纵向发展，而是横向发展，不易于管理。
    //多重异步形成强耦合，只要有一个操作需要修改，它的上层回调函数和下层回调函数都需要修改，这种现象就叫做“回调地狱”。
}