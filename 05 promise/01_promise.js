/*
Promise对象是一个构造函数，用来生成Promise实例
*/
{
    //Promise构造函数接受一个函数作为参数，
    //函数的两个参数分别是resolve和reject
    //resolve函数：Promise对象的状态从pending到resolved时调用
    //reject函数：Promise对象的状态从pending到rejected时调用
    const promise = new Promise(function(resolve,reject){
        if(true){
            resolve(data);
        }else{
            reject(error);
        }
    });

    //Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数
    //第一个回调函数是Promise对象的状态变为resolved时调用，第一个函数必填，第一个函数的参数是Promise对象执行resolve函数时传的参数
    //第二个回调函数是Promise对象的状态变为rejected时调用，第二个函数选填，第二个函数的参数时Promise对象执行reject函数时传的参数
    promise.then(function(value){
        //success
    },function(error){
        //failure
    });
}

{
    //Promise新建后就会立即执行
    let promise = new Promise(function(resolve,reject){
        console.log('Promise');             //Promise新建实例后，立即执行。
        resolve();
    });

    promise.then(function(){
        console.log("Resolved");
    });

    console.log('Hi!');

    //Promise
    //Hi!
    //Resolved
    //then函数会在当前脚本所有同步任务执行完之后才会执行。
}

{
    //用Promise对象实现Ajax操作的例子

    let getJSON = function(url){
        let promise = new Promise(function(resolve,reject){
            let handler = function(){
                if(this.readyState !== 4){
                    return;
                }
                if(this.status === 200){
                    resolve(this.response);
                }else{
                    reject(new Error(this.statusTest));
                }
            };

            let client = new XMLHttpRequest();
            client.open('get',url);
            client.onreadystatechange = handler;
            client.responseType = 'json',
            client.setRequestHeader("Accept","application/json");
            client.send();
        });

        return promise;
    };
}

{
    //resolve或者reject函数的参数除了正常的值以外，还可以是Promise实例。
    const p1 = new Promise(function(resolve,reject){
        //p1执行reject函数，导致最后执行function(error){}回调函数
        setTimeout(()=>reject(new Error('fail')),3000);  
    });

    //p1被当作resolve函数的参数，即p2异步操作返回的结果是返回p1异步操作。
    const p2 = new Promise(function(resolve,reject){
        setTimeout(()=>resolve(p1),1000);   //p2执行resolve，传参p1对象，导致p1的状态决定p2的状态
    });

    //调用resolve或reject以后，Promise的使命就完成了，
    //后继操作应该放在then方法里面，而不应该放在resolve或reject的后面
    p2.then(function(data){
        console.log(data);
    },function(error){
        console.error(error);
    });
}