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

{
    //异步Generator函数
    //区别于同步Generator函数，异步Generator函数每次执行next方法，返回的是异步遍历器指针对象，
    //对象的value属性值是一个Promise对象。直到此Promise对象resolved了，才会执行then方法，获取值。

    //异步Generator函数，在语法上就是async函数与同步Generator函数的结合。
    async function* asyncGenerator(url){
        console.log('Start');       
        let res = yield await fetch(url);       
        let data = yield await res.text();
        console.log(data);
        return;
    }

    let url = "https://www.random.org/decimal-fractions/?num=1&dec=10&col=1&format=plain&rnd=new";
    let asyGen = asyncGenerator(url);
    let iterPromise = asyGen.next();     //开始执行，直到fetch(url)，获取Promise对象
    iterPromise.then(iterator=>asyGen.next(iterator.value))     //Promise对象执行then方法，遍历器对象执行next方法让asyncGenerator函数继续执行
    .then(iterator=>asyGen.next(iterator.value));

    /*
    1.第一个asyGen.next()返回一个Promise对象
    2.asycnGenerator函数开始执行，输出Start，
    3.await命令返回一个Promise对象，asyncGenerator函数停在await fetch(url)。
    4.此Promise对象resolved之后，then方法内部的回调函数开始执行，
      此函数的参数是指针对象，内部的value就是yield命令后面的表达式的值。
      执行此回调函数，让asyncGenerator函数继续执行。
    5.执行到第二个await命令，有返回一个Promise对象，asyncGenerator函数停在await res.text()。
    6.与第4步一样，如果此Promise对象resolved之后，then方法内部的回调函数开始执行，
      执行遍历器对象的next方法，让asyncGenerator函数继续执行。
    7.执行到最后，输出结果，并返回。
    */

    //如果异步Generator函数内部出现错误，抛出异常，则Promise对象的状态会变成reject，
    //此时Promise对象的catch()方法可以捕获异常。

    async function* asyncGenerator2(){
        throw new Error('Problem!');
    }

    let gen = asyncGenerator2();
    let iter_Promise = gen.next();
    iter_Promise
    .then(iterator=>gen.next(iterator.value))
    .catch(error=>console.error(error.message));        //Problem!
}

{
    //异步Generator函数执行器

    async function takeAsync(asyncIterable,count=Infinity){
        let result = [];
        try{
            let asyncIterator = asyncIterable[Symbol.asyncIterator]();
            while(result.length<count){
                let {value,done} = await asyncIterator.next();
                if(done) break;
                result.push(value);
            }   
        }catch(e){
            console.error(e.message||e);
        } 
        return result;       
    }

    async function* gen(){
        yield 'a';
        yield 'b';
        yield 'c';
    };

    (async()=>{
        let res =await takeAsync(gen());
        console.log(res);          //["a","b","c"]
    })();   
}

{
    //yield*语句也可以跟随一个异步遍历器

    async function* gen(){
        yield 'a';
        yield 'b';
        return 'c';         //done:true，所以不会遍历到它
    }

    async function* gen2(){
        yield* gen();
        yield 'd';
    }

    (async()=>{
        for await(var item of gen2()){
            console.log(item);    //a,b,d
        }
    })();
}