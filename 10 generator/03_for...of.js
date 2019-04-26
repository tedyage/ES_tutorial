/*
for...of循环
*/

{
    //for...of循环可以自动遍历Generator函数运行时生成的Iterator对象，
    //且不需要调用next()

    function* foo(){
        yield 1;    //{value:1,done:false}
        yield 2;    //{value:2,done:false}
        yield 3;    //{value:3,done:false}
        yield 4;    //{value:4,done:false}
        yield 5;    //{value:5,done:false}
        return 6;   //{value:6,done:true}
    }

    for(let num of foo()){
        console.log(num)   //1,2,3,4,5
    }

    //注意，next()方法返回对象的done属性为true时，for...of就会终止，切不包含此返回对象。
    //所以6不会输出。
}

{
    //使用Generator函数和for...of循环实现斐波那契数列
    function* fibonacci(){
        let [prev, curr] = [0,1];
        while(true){
            yield curr;
            [prev,curr] = [curr,prev+curr];
        }
    }

    for(let n of fibonacci()){
        if(n > 20) break;
        console.log(n);         //1,1,2,3,5,8,13.....
    }
}

{
    //使用Generator函数让对象可以使用for...of循环
    let jane = {first:'Jane',last:'Doe'};

    function* objectEntries(obj){
        let keys = Reflect.ownKeys(obj);   //获取对象所有键名，并组成数组

        for(let propKey of keys){
            yield [propKey,obj[propKey]];  //每次暂停iterator对象的value都是键名与键值的数组。
        }
    }
    
    for(let [key,value] of objectEntries(jane)){
        console.log(key,value)    //first Jane, last Doe
    }
    
    //为对象加上Symbol.iterator属性，也可以让对象使用for...of循环

    function* objectEntries2(){
        let keys = Object.keys(this);   //获取引用对象的所有键名，并组成数组

        for(let propKey of keys){
            yield [propKey,this[propKey]];
        }
    }

    jane[Symbol.iterator] = objectEntries2;   //将此方法赋给对象的Symbol.iterator属性

    for(let [key,value] of jane){
        console.log(key,value)    //first Jane, last Doe
    }
}

{
    //利用generator函数返回iterator对象，同时for...of可以使用iterator对象进行遍历，
    //所以gererator函数可以转化为数组，可以解构赋值

    function* generator(){
        yield 1;
        yield 2;
        yield 3;
        return;
    }

    console.log([...generator()])     //[1,2,3]，扩展运算符就是利用for...of循环将值组成数组
    
    let [x,y,z] = generator();  
    console.log(x,y,z);               //1 2 3，解构赋值也是利用for...of循环
}