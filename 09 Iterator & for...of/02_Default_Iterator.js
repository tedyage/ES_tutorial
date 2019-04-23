/*
默认Iterator接口
ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性，
或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是拥有Iterator接口。
*/

{
    let arr = [];
    console.log(arr[Symbol.iterator]);   //[Function: value]
    let map = new Map();
    console.log(map[Symbol.iterator]);
    let set = new Set();
    console.log(set[Symbol.iterator]);
    let str = "";
    console.log(str[Symbol.iterator]);
    // let nodeList = new NodeList();
    // console.log(nodeList[Symbol.iterator]);

    function foo(){
        console.log(this.arguments);
    }
    foo(1,2,3);
    //原生具备默认Iterator接口的数据结构包括：
    //Array,Map,Set,String,TypeArray,NodeList,函数的arguments对象
    //Object因为不具备[Symbol.Iterator]属性，所以不具有Iterator接口，不能用for...of遍历
    //可以通过给Object的prototype中加入[Symbol.Iterator]属性，并指向一个返回next属性对象的方法。
    
}
