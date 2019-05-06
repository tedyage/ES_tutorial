/*
异步遍历器
*/
const fetch = require("node-fetch");
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


    //我们先创建一个异步的Generator方法
    //语法上是async函数与Generator函数的结合
    //该方法返回的就是异步遍历器
    async function* asyncGen(arr){
        for(let i = 0 ; i < arr.length ; i++){
            yield arr[i];
        }
    }

    let asyncIterator = asyncGen(arr);
    let promise = asyncIterator.next();    
    console.log(promise);                  //{pending}
    promise.then(data=>console.log(data)); //{value:1,done:false}
    promise = asyncIterator.next()
    promise.then(data=>console.log(data)); //{value:2,done:false}
    promise = asyncIterator.next();
    promise.then(data=>console.log(data)); //{value:3,done:false}
    promise = asyncIterator.next();
    promise.then(data=>console.log(data)); //{value:undefined,done:true}

    //异步遍历器返回的是promise对象，
    //等到promise对象resolve之后，才会返回遍历器指针对象

    //异步遍历器适合在for...of循环中编写异步操作。
    //这些异步操作在异步遍历器中是并发执行的。
}

{
    //异步遍历for await... of

    //如果我们用for...of来做异步便利，写法是这样的。
    let urls = ["https://api.github.com/users/github","https://api.github.com/users/github","https://api.github.com/users/github"];
    async function* asyncFetchUrls(urls){
        for(let i = 0 ; i<urls.length;i++){
            yield fetch(urls[i]);
        }
    }

    let asyncFetch = asyncFetchUrls(urls);
    console.log(asyncFetch.next());
    // for(let promise of asyncFetch){
    //     promise.then(data=>console.log(data));
    // }
}