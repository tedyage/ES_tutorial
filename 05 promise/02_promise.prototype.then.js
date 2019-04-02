/*
Promise.prototype.then()
Promise实例具有then方法，它的作用是为Promise实例添加状态改变时的回调函数。
*/

{
    //then方法返回的是一个新的Promise实例。因此可以采用链式写法，即then方法后面再调用另一个then方法
    getJSON('/posts.json')
    .then(function(data){
        return data.post;        //第一个then方法返回的是一个Promise实例，故可以直接调用then方法，                             
    }).then(function(post){      //第一个then方法回调函数里返回的值，会作为第二个then方法的回调函数的参数
        //...
    });
}

{
    //有时，前一个then方法中的回调函数的返回结果有可能还是一个Promise对象。
    //这时，后一个then方法中的回调函数，就会等待此Promise对象的状态发生变化，才会被调用。
    getJSON('/post/1.json')       //getJSON方法返回的是一个Promise对象
    .then(function(data){
        return getJSON(data.url); //回调函数返回的是另一个Promise对象
    }).then(function funcA(comments){          //另一个Promise对象的resolved状态执行funcA函数
        console.log("resolved: "+comments);  
    },function funB(err){                      //另一个Promise对象的rejected状态执行funcB函数
        console.error("rejected: "+err );
    });

    //采用箭头函数，上面的代码可以简写
    getJSON('/post/2.json')
    .then(data=>getJSON(data.url))
    .then(comments=>console.log("resolved: "+comments))
    .catch(err=>console.error("rejected: "+err));

}