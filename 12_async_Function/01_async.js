/*
async含义
*/
const fetch = require('node-fetch');

{
    //什么是async函数？
    /*
    async实际上是Generator函数的语法糖。
    区别于Generator函数返回的是iterator指针对象，async函数返回的是Promise对象。
    async函数内置了Generator函数流控制器，替代了过去必须用co模块才能控制Generator函数的自动运行。
    区别于原来co模块约定，yield后面只能是Thunk函数和Promise对象，async函数的await关键字后面，可以是Promise对象和原始类型的值。    
    async/await相较Generator的*和yield，拥有更好的语义
    */
}

{
    //下面是一个例子，制定多少毫秒后输出一个值
    function timeout(ms){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(),ms);
        });
    }

    //由于timeout函数返回的是一个Promise对象，所以写法还可以修改成这样
    async function timeout2(ms){
        await new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(),ms);
        });
    }

    {
        async function asyncPrint(value,ms){
            await timeout2(ms);
            console.log(value);
        }

        asyncPrint('hello world',1000);
    }
    
}

{
    //async函数有多种使用形式

    //1.声明async函数
    async function foo(){}
    foo();

    //2.async函数表达式
    var foo2 = async function(){};
    foo2();

    //3.对象的async方法
    var obj = {async foo(){
        //内部代码
    }};
    obj.foo();

    //4.Class里面的async方法
    // class Storage{
    //     constructor(){
    //         this.cachePromise = caches.open('avatars');
    //     }

    //     async getAvatars(name){
    //         let cache = await this.cachePromise;
    //         return cache.match(`/avatars/${name}.jpg`);
    //     }
    // }

    // let storage = new Storage();
    // storage.getAvatars('jake');

    //5.箭头函数
    let foo3 = async ()=>{};
    foo3();
}

{
    //返回Promise对象
    //async函数内部return语句返回的值，会成为then方法回调函数的参数。
    async function f(){
        return 'hello world promise';
    }

    f().then(data=>console.log(data));

    //async函数内部如果抛出错误，会被catch方法捕获。

    async function f1(){
        throw new Error("Unexpected Error.");
    }
    f1().then(data=>console.log(data))
    .catch(error=>console.error(error.message));

    //async函数要返回Promise对象，其状态必须要等待内部await后面的Promise对象执行完成，
    //才会发生改变，除非是遇到return或者抛出错误。

    async function getTitle(url){
        let response = await fetch(url);
        let html = await response.text();
        return html.match(/<title>([\s\S]+)<\/title>/i)[1];
    }

    getTitle('https://tc39.github.io/ecma262/')
    .then(data=>console.log(data))
    .catch(error=>console.error(error.message));
    //执行getTitle方法时，必须先获取了url的响应结果，
    //再等待将响应结果转换为文本，
    //最后等到返回了对应的title信息完成后，才能执行then方法。
}

{
    //await命令

    //await命令后面，通常是一个Promise对象。
    //也可以是一个thenable对象，即内部拥有then方法的对象，await会将其等同于Promise对象处理。
    //如果不是Promise对象，也不是thenable对象，则直接返回对应的值即可。

    async function f(){
        await fetch('https://tc39.github.io/ecma262/');
    }
    f().then(()=>console.log("返回的是Promise对象。"));

    async function thenable(){
        return await {
            then(resolve,reject){
                resolve('返回一个thenable对象');
            }
        }
    }
    thenable().then(data=>console.log(data));

    async function othertype(){
        return await '直接返回值。';
    }
    othertype().then(data=>console.log(data));

    //任何一个await后面的Promise对象的状态变成reject状态，都会中断整个async函数的执行
    async function f1(){
        await Promise.reject(new Error("出错了。"));
        await Promise.resolve('hello world');        //这一句不会执行
    }

    f1().then(data=>console.log(data))
    .catch(error=>console.error(error.message));     //出错了
    
    //但是有时，我们希望一个await后面的Promise状态转变为rejected，不会影响到其它await后面的Promise对象的执行
    //可以在对象的reject方法后面尾随catch方法。

    async function f2(){
        await Promise.reject(new Error('出错了2.')).catch(error=>console.error(error.message));
        await Promise.resolve('hello world');
    }

    f2().then(data=>console.log(data));
}

{
    /*
    1.await错误处理，由于await后面的Promise对象的状态，
    有可能是rejected，所以保证能够捕获到不同的Promise对象的错误信息,
    最好将多个await命令放在try...catch代码块中
    */

    (async ()=>{        
        try{
            let i = 0;
            for(i=0;i<3;i++){
                await fetch('http://google.com/this-throws-an-error');    //三次执行await，被放在try...catch里面
            }
            console.log(i);       
        }catch(e){
            console.error(e.message);
        }        
    })();

    //2.如果多个await后面的Promise对象之间，不存在前后继发关系，可以让他们并列运行
    (async()=>{
        let baz = await Promise.all([Promise.resolve("Foo"),Promise.resolve("Bar")]);
        console.log(baz);
    })();

    //3.await命令只能用在async函数值中，如果用在普通函数中，会报错。
    try{
        //await Promise.resolve("123");  //SyntaxError: await is only valid in async function
    }catch(e){
        console.error(e.message);
    }

    //4.async函数可以保留运行堆栈
    
    async function b(){
        let res = await fetch('https://tc39.github.io/ecma262/');
        let html = await res.text();
        throw new Error(new Error("异步操作出错了。"));
        //return html.match(/<title>([\s\S]+)<\/title>/i)[1];
    } 

    function c(data){
        console.log("异步任务执行完毕，data is"+data);
    }

    // (()=>{
    //     try{
    //         b().then((data)=>c("data is "+data));
    //         console.log("IIFE执行完毕")
    //     }    
    //     catch(e){
    //         console.error(e.message||e);
    //     }    
    // })();


    //立即执行函数内部运行了一个异步任务b()，当b()运行的时候，a()的运行已经结束了。
    //b()所在的上下文环境已经消失了，所以b()抛出的错误，a()的catch不会捕获。

    (async()=>{
        try{
            let data = await b();
            c(data);
            console.log("IIFE执行完毕")
        }    
        catch(e){
            console.error(e.message||e);
        } 
    })();
    //立即执行函数是一个async函数，这样，当await b()运行的时候，a()会暂停运行，保存上下文。
    //一旦b()或者c()报错，错误堆栈会包括a()。
}


