/*
异步遍历器
*/
const fetch = require("node-fetch");
const fs = require('fs');
//异步遍历器，与同步遍历器相比，最大的不同在于
//同步遍历器每次调用next()，返回的是遍历器指针对象
//异步遍历器每次调用next()，返回的是Promise对象，等到Promise对象resolve了，才会返回遍历器指针对象

{
    let arr=[1,2,3]
    let iterator = arr[Symbol.iterator]();

    let value = iterator.next();
    console.log(value);         //{value:1,done:false}

    value = iterator.next(); 
    console.log(value);         //{value:2,done:false}

    value = iterator.next();
    console.log(value);         //{value:3,done:false}

    value = iterator.next();
    console.log(value);         //{value:undefined,done:true}
    //这个是同步遍历器


    
}

{
    //异步遍历for await... of
    //对于拥有Symbol.asynciterator遍历器的对象，我们可以使用for await...of来遍历他。
    //如果使用for...of来遍历它的话，每次遍历得到的都是Promise对象。
    //等到Promise对象resolved之后，才会得到遍历器指针对象内部的值。

    //异步遍历经常用于流式读取文件
    //普通的读取文件方法是这样的。
    let file = "./12_async_Function/assets/a.txt";
    let readStream = fs.createReadStream(file,{encoding:'utf-8'});

    readStream.on('data',function(chunk){
        console.log(`...${chunk}`);
    });
    readStream.on('end',function(){
        console.log('...end...');
    });

    //如果用异步遍历器的读取方法，代码就简洁很多
    (async()=>{
        let readStream2 = fs.createReadStream(file,{encoding:'utf-8'});
        for await (let chunk of readStream2){
            console.log(`...${chunk}`);
        }
        console.log('...end...');
    })();
    
}