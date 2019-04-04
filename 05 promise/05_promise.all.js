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

{
    const promises = [2,3,5,7,11,13].map(id=>{
        var p = new Promise((resolve,reject)=>{
            if(id<15){
                resolve(id*2);
            }else{
                reject(id);
            }
        });
        return p;
    });

    const p = Promise.all(promises)
    .then(data=>console.log(data))     //当6个Promise对象的状态都变成fulfilled，才执行then方法，输出的是6个调用resolve函数时传入的参数的数组
    .catch(error=>console.error(error));     //当6个Promise对象中，发现了第一个状态变成reject的对象时，执行catch方法，输出的是那个reject方法的参数
}

{
    //如果作为Promise.all()的参数的其中的Promise实例，自己定义了catch方法，
    //那么一旦这个实例被reject，也不会触发Promise.all()的catch方法
    //原因是catch方法返回的也是一个新的Promise实例，而这个新的实例的状态为resolved

    //p1的状态为resolved
    const p1 = new Promise((resolve,reject)=>{
        resolve('hello');
    }).then(data=>data);

    //p2虽然抛出一个Error，但是其执行catch方法，接受了Error对象，并返回了新的Promise对象
    //p2此时指向这个新的Promise对象，而此对象的状态为resolveD
    const p2 = new Promise((resolve,reject)=>{
        reject(new Error('出错了.'));
    }).then(data=>console.log(data))
    .catch(error=>error.message);

    //由于p1,p2的最终状态都是resolved，所以Promise.all([p1,p2])的最终状态是resolved
    Promise.all([p1,p2])
    .then(data=>console.log(data))
    .catch(error=>console.error(error));
}