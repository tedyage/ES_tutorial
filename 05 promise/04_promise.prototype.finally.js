/*
Promise.prototype.finally()
该方法用于指定，不管Promise最后的状态如何，都会执行的函数
*/

//finally方法的定义
Promise.prototype.finally = function(callback){
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(()=>value),
        reason => P.resolve(callback()).then(()=>{throw reason})
    );
};

{
    const promise1 = new Promise((resolve,reject)=>{
        resolve('OK');
    }).then(data=>console.log(data))
    .catch(error=>console.error(error))
    .finally(()=>console.log('Ah! finally.'));

    const promise2 = new Promise((resolve,reject)=>{
        reject(new Error('error'));
    }).then(data=>console.log(data))
    .catch(error=>console.error(error))
    .finally(()=>console.log('Ah! finally.'));
    //finally方法的回调函数不接受任何参数，
    //所以，finally方法无法确定Promise对象的最终状态，
    //由此得知，finally方法与Promise对象的状态是无关的。
    //finally方法总是返回原来的值  
}