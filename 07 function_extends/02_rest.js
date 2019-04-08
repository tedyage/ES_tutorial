/*
rest 参数
用户获取函数的多于参数，这样就不需要使用arguments对象了。
rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
*/

{
    function add(...args){
        let total = 0;
        for(let i of args){
            total+=i;
        }
        return total;
    }

    console.log("add(1,2,3,4,5,6,7) is "+add(1,2,3,4,5,6,7));

    function f(a){
        console.log(a);
        console.log(arguments);
    }
    f(1,2,3,4,5,6,7);
}

{
    //注意rest参数之后，不能再加其他的参数，否则会报错
    //SyntaxError: Rest parameter must be last formal parameter
    // function f(x,...args,y){
    //     console.log(x,args,y);
    // }

    // f(1,2,3,4,5);
}