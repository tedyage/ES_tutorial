/*
Promise.prototype.catch方法是用于指定异步操作发生错误时的回掉函数
*/
'use strict'
function getJSON(url){
    const promise = new Promise((resolve,reject)=>{
        const handler = function(){
            if(this.readystate!==4){
                return;
            }
            if(this.status === 200){
                resolve(data);
            }else{
                reject(this.statusText);
            }
        }

        let webClient = new XMLHttpRequest();
        webClient.onreadystatechange = handler;
        webClient.open("get",url);
        webClient.responseType = "json";
        webClient.setRequestHeader("Accept","application/json");        
        webClient.send();
    });

    return promise;
}

{
    getJSON('posts.json')
    .then(data=>console.log(data))
    .catch(error=>console.error(error));
}

{
    //reject函数的作用，就相当于抛出错误信息
    //catch函数的作用，就相当于捕获错误信息
    const promise1 = new Promise((resolve,reject)=>{
        reject(new Error('test'))
    }).catch(error=>console.error(error));

    const promise2 = new Promise((resolve,reject)=>{
        throw new Error('test');
    }).catch(error=>console.error(error));
}

{
    //如果Promise对象的状态由pending转成了fulfilled之后，再抛出错误信息，是catch不到的。
    //因为Promise对象的状态一旦改变，就无法再次改变

    const promise = new Promise((resolve,reject)=>{
        resolve("OK");
        reject(new Error('error'));       //promise状态已经转换到resolved，故reject函数会执行，但不会生效
    }).then(data=>console.log(data))
    .catch(error=>console.error(error));
}

{
    //Promise对象的错误具有“冒泡”性质，会一直向后传递，知道被捕获为止。
    getJSON('post1.json')
    .then(data=>getJSON('post2.json'))
    .then(comments=>console.log(comments))
    .catch(error=>console.error(error));
    //上面代码中，有三个Promise对象，分别是getJSON('post1.json')和2个then函数，
    //三个Promise对象中任意一个抛出了错误，catch函数都会捕获到。
    //因此，建议不要再then函数中，添加reject函数，而是在then函数的后面加入catch函数
    
}

{
    //如果Promise对象没有使用catch函数指定错误的回掉函数，
    //所抛出的错误不会传递到外层代码，也不会有任何反应。
    function someThing(){
        return new Promise((resolve,reject)=>{
            resolve(x+2);
        });
    }
    someThing().then(data=>console.log(data));

    setTimeout(()=>console.log('123'),2000);

    //ReferenceError: x is not defined
    //123
    //Promise内部的错误不会影响到Promise外部的代码，通俗的说法就是“Promise会吃掉错误”

    const promise = new Promise((resolve,reject)=>{
        resolve('OK');
        setTimeout(()=>{throw new Error('error')},0);
    });
    promise.then((data)=>{console.log(data)});
    //Promise内部，setTimeout函数指定将Error在下一个时间循环中抛出，
    //而promise对象已经运行结束了，所以这个错误是在Promise函数体之外被抛出的，成为了未捕获的错误

    //catch方法返回的依然是promise对象，所以catch方法后面可以跟then方法
    someThing()
    .catch(error=>console.error(error))
    .then(()=>console.log('carry on.'));    
    //运行外catch方法指定的回调函数，会接着运行then方法中的回调函数
    //如果没有报错，则会跳过catch方法，直接执行then方法中的回调函数
}

