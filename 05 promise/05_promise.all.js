/*
Promise.all()
该方法用于将多个Promise实例，包装成一个Promise实例
*/

{
    const p1 = new Promise((resolve,reject)=>{
        resolve('OK');
    });

    //p2的最终状态是rejected
    const p2 = new Promise((resolve,reject)=>{
        reject(new Error('error'));
    });

    const p3 = new Promise((resolve,reject)=>{
        resolve('Hi');
    });

    //Promise.all内部的参数可以是一个数组，也可以是拥有Iterator接口的其它对象
    //数组的内部元素必须都要是Promise实例，如果不是，就要将该参数转化为Promise对象
    const p = Promise.all([p1,p2,p3]);
    //p的状态由p1,p2,p3三个Promise对象的状态来决定，
    //只有p1,p2,p3三个的状态都成为fulfilled，p的状态才能变成fulfilled
    //只有p1,p2,p3有一个成为rejected，p的状态才能变成rejected
    p.then(data=>console.log("H1! Hello! Ok!"))
    .catch(error=>console.error(error));
    
}