const co = require("co");    //generator自动流控制，利用Promise实现
const readFile = require("fs-readfile-promise");      //返回Promise对象的文件读取模块
const basedir = './11 asynchronous';

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

    /*
    co模块的原理
    */
}
