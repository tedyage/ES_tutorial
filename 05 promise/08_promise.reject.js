/*
Promise.reject()
该方法于Promise.resolve()方法一样，也是返回一个Promise对象，
该对象的状态为rejected
*/

{
    const p = Promise.reject('出错了')
    .catch(error=>console.error(error));
    //等同于
    const p1 = new Promise((resolve,reject)=>{
        reject('出错了')
    }).catch(error=>console.error(error));

    
}

{
    //注意，与Promise.resolve有不同的地方，
    //Promise.resolve()会将不是Promise对象的参数转换为Promise对象，再传入到then方法
    //Promise.reject()会将参数原封不动的传入到then方法，不需要转换为Promise对象。
    const thenable = {
        then:function(resolve,reject){
            reject('出错了')
        }
    };

    Promise.reject(thenable)
    .catch(error=>console.error(error));         //输出的不是“出错了”，而是thenable对象

    const str = 'Hello world';
    Promise.reject(str)
    .catch(error=>console.error(error));         //Hello world
}