/*
按顺序异步完成操作
*/
const fetch = require("node-fetch");
const co = require("co");
const urls=["https://api.github.com/users/github","https://api.github.com/users/github","https://api.github.com/users/github"];

//先看看Promise的写法
{
    (function (){
        //顺序请求所有url
        let textPromises = urls.map((url)=>{
            return fetch(url).then(response=>response.text());
        });

        textPromises.forEach((textPromise)=>{
            textPromise.then(data=>console.log(data));
        })
    })();

    //这样的写法语义行不强，大量借助Promise语法。
}

//再看看Generator函数写法
{
    co(function*(){
        for(let url of urls){
            try{
                let res = yield fetch(url);
                let text = yield res.text();
                console.log(text);
            }catch(e){
                console.error(e.message||e);
            }            
        }
    });
    //这样的写法，虽然语义上提高了，但是需要外置一个自动控制器。
}

//再看看async函数的写法
{
    (async ()=>{
        for(let url of urls){
            try{
                let res = await fetch(url);
                let text = await res.text();
                console.log(text);
            }catch(e){
                console.error(e.message||e);
            }           
        }
    })();
    //这样的写法，语义更好了，而且无需再加入自动控制器，
    //代码更加简洁，
    //但是这样写，每一个请求之间都会有继发的关系，即必须等待上一个请求返回了结果，才会开始下一个请求。
    //比较耗时，我们的要求是，按顺序并发地发送请求。
}

//可以利用async函数和数组的map方法，配合使用
{
    (()=>{
        let textPromises = urls.map(async url=>{
            let res = await fetch(url);
            let text = await res.text();
            return text;
        });

        for(let textPromise of textPromises){
            textPromise.then(data=>console.log(data));
        }
    })();


}