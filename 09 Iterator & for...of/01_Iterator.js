/*
Iterator遍历器
它是一种为不同数据结构提供的统一的遍历访问的机制；
只要某数据结构部署了Iterator接口，该数据结构就可以遍历操作内部的每个成员
*/

/*
Iterator遍历器的作用
1.为各种数据结构，提供统一的访问接口；
2.使得各种数据结构内部的成员，可以按照某种次序排列；
3.ES6创造了for...of循环命令，Iterator可以使用该命令遍历数据结构
*/

{
    //Iterator遍历器的本质，是一个指针对象。
    //指针对象执行next()对象，可以执行对数据结构的遍历，
    //执行next方法返回的结果，是一个包含value和done两个属性的对象，
    //value指向当前指针指向的的值，而done返回布尔值，代表遍历是否完成

    function IteratorFunc(arr){
        let pIndex = 0;
        return {
            next:function(){
                return pIndex<arr.length?
                {value:arr[pIndex++],done:false}:
                {value:undefined,done:true}
            },
        };
    }

    let it = IteratorFunc([1,2,3]);
    console.log(it.next());     //{value:1,done:false}
    console.log(it.next())      //{value:2,done:false}
    console.log(it.next())      //{value:3,done:false}
    console.log(it.next());     //{value:undefined,done:true}

    //遍历器实际上是与数据结构分开的，不会依赖于数据结构。
}