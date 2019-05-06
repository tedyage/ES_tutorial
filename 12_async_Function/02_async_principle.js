/*
async函数的实现原理
*/

const fetch = require('node-fetch');
const co = require('co');

{
    /*
    async函数的实现原理，就是将异步函数Generator和自动流控制器包装起来，在一个函数里运行。
    */

    async function gitHub(url){
        let value = await fetch(url);
        value = await value.text();
        return value;
    }

    gitHub("https://api.github.com/users/github")
    .then(data=>console.log(data))
    .catch(error=>console.error(error.message||error));

    function gitHub2(url){
        return co(function* (){
            let value = yield fetch(url);
            value = yield value.text();
            return value;
        })
    }

    gitHub2("https://api.github.com/users/github")
    .then(data=>console.log(data))
    .catch(error=>console.error(error.message||error));

    //github方法，与github2方法，结果一样，
    //github方法是async方法，
    //github2方法是将generator函数放入到co自动流控制器中。
}