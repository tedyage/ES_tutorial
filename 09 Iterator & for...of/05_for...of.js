/*
for...of循环
一个数据结构只要拥有Symbol.iterator属性，就会被视为拥有iterator接口，
就可以用for...of循环遍历它的成员。
默认可以使用for...of循环的数据结构范围包括：Array/String/Map/Set/NodeList/方法中的arguments对象/Generator对象
*/

{
    //数组
    var arr = ['a',1,true,{foo:'bar'}];
    for(var i in arr){
        console.log(i);          //0,1,2,3
    }

    for(var o of arr){
        console.log(o);          //'a',1,true,{foo:'bar'}
    }
}

{
    //Set
    var enginesSet = new Set(['Gecko','Trident','Webkit','Webkit']);
    for(var e of enginesSet){
        console.log(e);          //Gecko, Trident, Webkit
    }

    //Set数据结构遍历时，iterator接口返回的只有键值。
}

{
    //Map
    var map = new Map([["editor",6],["committee",'TC39'],['standard','ECMA-262']]);
    for(var [name,value] of map){
        console.log(name,value);   //editor 6,committe TC39,standard ECMA-262
    }
    //Map数据结构遍历是，iterator接口返回的是键名和键值组成的数组。
}

{
    //Array/Map/Set，都有三个返回遍历器的方法。
    //entries()/keys()/values()
    let arr = ['a','b','c','d'];
    let set = new Set(['a','b','c','d']);
    let map = new Map([['key1','a'],['key2','b'],['key3','c'],['key4','d']]);
    //对entries()遍历，返回的是键名和键值组成的数组
    for(let entry of arr.entries()){
        console.log(entry);       //[0,'a'] [1,'b'] [2,'c'] [3,'d']
    }

    for(let entry of set.entries()){
        console.log(entry);       //['a','a'] ['b','b'],['c','c'],['d','d']
    }

    for(let entry of map.entries()){
        console.log(entry);       //['key1','a'] ['key2','b'] ['key3','c'] ['key4','d']
    }
    //对keys()遍历，返回的是键名
    for(let key of arr.keys()){
        console.log(key);         //0,1,2,3
    }

    for(let key of set.keys()){
        console.log(key);         //'a','b','c','d'
    }

    for(let key of map.keys()){
        console.log(key);         //'key1' 'key2' 'key3' 'key4'
    }
    //对values()遍历，返回的是键值
    for(let value of arr.values()){
        console.log(value);       //'a','b','c','d'
    }

    for(let value of set.values()){
        console.log(value);       //'a','b','c','d'
    }

    for(let value of map.values()){
        console.log(value);       //'a','b','c','d'
    }
}

{
    //如何让普通的对象也能用for...of遍历
    let obj = {
        foo:'Hello',
        bar:'World',
        num:10,
        baz:true
    };

    for(let i in obj){
        console.log(i,obj[i]);     //foo 'Hello', bar 'World', num 10, baz true
    }

    try{
        for(let i of obj){
            console.log(i);            
        }
    }catch(e){
        console.error(e.message);  //obj is not iterable
    }
    
    //对象不具有iterator接口，不能使用for...of循环
    
    //使用Object.keys()方法，将对象的键名生成一个数组，然后遍历这个数组
    for(let key of Object.keys(obj)){
        console.log(key+':'+obj[key]);    //将obj的key生成一个数组，对这个数组进行for...of遍历
    }

    //另一种方法，是使用Generator方法将obj封装一下，对这个Generator方法进行for...of遍历
    function* entries(obj){
        for(let key of Object.keys(obj)){
            yield [key,obj[key]];
        }
    }

    for(let [key,value] of entries(obj)){
        console.log(key+"->"+value);     //foo->'Hello',bar->'World',num->10,baz->true
    }
}
