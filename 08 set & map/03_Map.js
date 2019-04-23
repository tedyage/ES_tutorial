/*
Map结构，类似于对象，也是键值对集合
区别在于：键的类型范围不再仅限于字符串，各种类型的值都可以当作键。
Object键值对的结构：字符串————值
Map键值对的结构：值————值
*/

{
    //定义一个Map实例，
    let map = new Map();
    map.set(1,"key is a number");
    map.set(true,"key is a boolean");
    map.set('p','key is a string');
    let o = {p:'hello'};
    map.set(o,"key is an object");

    console.log(map.get(1));  //key is a number
    console.log(map.get(true));  //key is a boolean
    console.log(map.get('p'));  //key is a string
    console.log(map.get(o));  //key is an object

    console.log(map.has(o));   //true
    console.log(map.has(2));   //false
    map.delete(o);
    console.log(map.has(o));   //false

    map.clear();

    //向Map对象添加成员要用set方法，
    //读取Map对象的内部成员要用get方法。
    //判断Map对象是否存在某成员要用has方法，
    //删除Map对象内某个成员用delete方法。
    //清空一个Map对象要用clear方法。

    //Map构造函数，可以接受一个数组作为参数。
    //该数组内部成员必须都是键值对的数组，即[["a","hello"],["b","world"]]
    let map2 = new Map([["name","tianzhiqiang"],["age","30"]]);

    console.log(map2.size);          //2
    console.log(map2.get("name"));   //tianzhiqiang
    console.log(map2.get("age"));    //30
    //map2中，有两个键：name和age，分别对应的值是：tianzhiqiang和30
    
    //事实上，任何一个具有Iterator接口，且每个内部成员都是双元素的数组的结构，
    //都可以被用作Map构造函数的参数，
    //也就是说，Set对象和Map对象也可以用来生成新的Map

    let set = new Set([['foo',1],['boo',2],['bar',3]]);
    let map3 = new Map(set);
    console.log(map3.get("foo"));  //1
    console.log(map3.get('boo'));  //2
    console.log(map3.get('bar'));  //3
}

{
    //如果对同一个键多次赋值，后面的值将覆盖前面的值
    let map = new Map();

    map.set(1,'abc').set(1,'def');
    console.log(map.get(1));  //def
    
    //如果读取一个未声明的键，返回的则是undefined
    console.log(map.get('asdfsf'));   //undefined
}

{
    //Map对象提供了3个遍历器，keys()/values()/entries()
    //Map对象提供了1个遍历方法，forEach()

    //注意一点，Map的遍历顺序，就是插入顺序
    let map = new Map([["name","tianzhiqiang"],["age","30"]]);

    for(let key of map.keys()){
        console.log(key);   //name,age
    }

    for(let value of map.values()){
        console.log(value);  //tianzhiqiang,30
    }

    for(let [key,value] of map.entries()){
        console.log(key,value);   //name tianzhiqiang, age 30
    }    
}

{
    //Map结构转换为数组结构，
    const map = new Map([
        [1,"hello"],
        [2,"world"]
    ]);
    //比较快速的方法是扩展运算符
    let arr1 = [...map.keys()],
        arr2 = [...map.values()],
        arr3 = [...map.entries()],
        arr4 = [...map];
    console.log(arr1);   //[1,2]
    console.log(arr2);   //[hello,world]
    console.log(arr3);   //[[1,hello],[2,world]]
    console.log(arr4);   //[[1,hello],[2,world]]

    //Map结构通过转化为数组之后，
    //可以借助数组的filter()方法，实现Map的过滤。
    let map1 = new Map([
        [1,'a'],
        [2,'b'],
        [3,'c']
    ]);

    map1 = new Map([...map1].filter(([k,v])=>k<3));
    console.log(map1);       //{1=>'a',2=>'b'}

    //也可以借助map()方法，实现Map的遍历
    map1 = new Map([...map1].map(([k,v])=>[k*2,'_'+v]));
    console.log(map1);      //{2=>'_a',4=>'_b'}
}

{
    //Map与其它数据结构的互相转换
    {
        //Map转换Array
        let map = new Map();
        map.set(true,7).set({foo:3},['abc']);
        console.log(map)     //{true=>7,{foo:3}=>['abc']}
        console.log([...map]);     //[[true,7],[{foo:3},['abc]]]
    }
    
    {
        //Array转换Map
        let map = new Map([
            [true,7],
            [{foo:3},['abc']]
        ]);
        console.log(map);    
        //{true=>7,{foo:3}=>['abc']}
    }

    {
        //Map转换为对象
        //如果Map所有的键都是字符串类型，则它可以无损的转为对象。
        //运用map的entries()循环体，遍历map，将key和value加入到obj中。
        let MapToObj = (map)=>{
            let obj = {};
            for(let [k,v] of map.entries()){
                obj[k] = v;
            }
            return obj;
        }

        let map = new Map([
            ['yes',true],
            ['no',false]
        ]);
        let obj = MapToObj(map);
        console.log(obj);    //{yes:true,no:false}
    }

    {
        //Object转换为Map
        //运用object的for...in循环，遍历所有的key/value，
        //调用set()，加key/value加入到map中。
        let ObjToMap = (obj) => {
            let map = new Map();
            for (let key in obj){
                map.set(key,obj[key]);
            }
            return map;
        }
        let obj = {
            yes:true,
            no:false
        };
        let map = ObjToMap(obj);
        console.log(map);      //{"yes"=>true,"no"=>false}
    }

    {
        //Map转换为Json，
        //如果map的所有的键都是字符串，
        //则可以通过先将map转换为object，再调用JSON.stringify()方法
        let MapToJson = (map)=>{
            let json = "";
            let obj = {};

            for(let [k,v] of map){
                obj[k] = v;
            }

            json = JSON.stringify(obj);
            return json;
        }

        let map = new Map().set('yes',true).set('no',false);
        let json = MapToJson(map);
        console.log(json);      //'{"yes":true,"no":false}'

        //如果map中存在不是字符串的键
        //则可以通过先将map转换为array，在调用用JSON.stringify()方法
        let MapToJson2 = (map) => {
            let json = "";
            let arr = [];
            for(let [k,v] of map){
                arr.push([k,v]);
            }

            json = JSON.stringify(arr);
            return json;
        }

        map = new Map().set(true,7).set({foo:3},'abc');
        json = MapToJson2(map);
        console.log(json);    //'[[true,7],[{"foo":3},"abc"]]'
    }

    {
        //Json转换为Map
        //可以先通过JSON.Parse()将json转换为object，
        //再将object转换为Map

        let JsonToMap = (json)=>{
            let obj = JSON.parse(json);
            let map = new Map();
            for(let key in obj){
                map.set(key,obj[key]);
            }
            return map;
        }

        let json = '{"yes":true,"no":false}';
        let map = JsonToMap(json);
        consolelog(map);    //{"yes"=>true,"no"=>false}
    }
}