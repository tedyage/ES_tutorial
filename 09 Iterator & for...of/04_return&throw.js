/*
遍历器对象的return()和throw()
遍历器方法，必须要有的函数时next()，
还可以编写return()和throw()
return()是在循环结束之前，退出循环的时候，调用的，比如说执行break语句；
throw()主要是配合Generator函数使用，一般的遍历器用不到这个方法
*/

{
    let arr = [1,2,3,4,5,6];


    Array.prototype[Symbol.iterator] = function(){

        let arr = this;
        let pIndex = 0
        return {
            next(){
                return pIndex<arr.length?
                    {value:arr[pIndex++]}:{done:true};           
            },
            return(){
                console.log("pIndex is "+pIndex);    //pIndex is 3
                return {done:true};                  //注意，return方法必须返回一个对象
            },
        }
    }

    for(let value of arr){
        if(value>2)
            break;                                   //调用遍历器的return方法
        else
            console.log(value);                      //1 2   
    }

    for(let value of arr){
        if(value>3)
            throw new Error('value > 3');           //调用遍历器的return方法，再抛出异常信息。
        else 
            console.log(value)                      //1 2 3
    }
}