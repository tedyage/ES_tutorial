/*
Promise.resolve()
有时需要将享有对象转为Promise对象，Promise.resolve方法就起到这个作用。
*/

{
    //将一个jQuery生成的deferred对象，转换为一个新的Promise对象。
    //Promise.resolve($.ajax('post.json'));

    //Promise.resolve()方法，等价于new Promise().resolve()
    Promise.resolve('foo');
    new Promise((resolve,reject)=>resolve('foo'));
}

{
    //参数如果是一个Promise对象，
    //那么Promise.resolve讲不做任何修改，原封不动的返回这个对象
    const promise = new Promise((resolve,reject)=>{
        resolve("I am a instance of Promise");
    });

    Promise.resolve(promise)
    .then(data=>console.log(data));

    console.log(Promise.resolve(promise));
}

{
    //参数如果是一个thenable对象，
    //thenable指的是具有then方法的对象
    //Promise.resolve方法会将thenable对象转化为Promise对象，然后执行thenable对象的then方法
    let thenable = {
        then:function(resolve,reject){
            console.log("hello");
            resolve("I am a thenable object");   //执行then方法，返回一个新的Promise对象，且对象的状态为resolved
        }
    };

    Promise.resolve(thenable)
    .then(data=>console.log(data));        //I am a thenable object，由于上一个then方法执行resolve方法，故这个then方法可以执行
}

{
    //参数如果不是thenable对象，或者不是一个对象
    //Promise.resolve方法会返回一个新的Promise对象，状态为resolved
    Promise.resolve('I am a string.')
    .then(data=>console.log(data));      //I am a string, 返回了一个新的Promise对象，且这个对象的状态为resolved
}

{
    //Promise.resolve方法允许调用时不带参数，
    //此时会直接返回一个Promise对象，状态为resolve

    var promise1 = new Promise((resolve,reject)=>{
        resolve('I am promise1');
    }).then(data=>console.log(data));

    var promise2 = Promise.resolve()      //Promise.resolve()方法返回一个新的Promise实例，状态为resolved
    .then(()=>'I am promise2')
    .then(data=>console.log(data));
}
