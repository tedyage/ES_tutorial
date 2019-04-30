/*
Promise对象
*/

/*
Promise对象，就是为解决“回调地狱”问题而出现的。
它将原来的嵌套回调函数，改成链式调用回调函数。
*/
const readFile = require("fs-readfile-promise");

{
    readFile("./11 asynchronous/assets/c.txt")
    .then(function(data){
        console.log(data.toString());
    })
    .then(function(){
        return readFile("./11 asynchronous/assets/d.txt")
    })
    .then(function(data){
        console.log(data.toString());
    })
    .catch(function(error){
        console.error(error)
    });

    /*
    Promise的写法，改进了回调函数的写法，
    使用了then方法之后，异步任务的执行看得更清楚了。
    但是，冗余代码太多，每个回调函数都要装在then方法中，导致会看到一堆then方法
    */
}