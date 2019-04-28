/*
yield*表达式
*/

{
    //如果在Generator函数内部，直接调用另一个Generator函数，
    //默认情况下是没有效果的
    function* f(){
        yield 'a';
        yield 'b';
    }

    function* g(){
        yield 'x';
        f();
        yield 'y';
    }

    let gen = g();
    console.log(gen.next());    //{"value":"x","done":false}
    console.log(gen.next());    //{"value":"y","done":false}
    console.log(gen.next());    //{"value":undefined,"done":true}
    //g()方法中，调用f()，但是从输出结果上看，没有在f()函数内部暂停，也没有输出f()函数内部的值。
}

{
    //此时就需要yield* 表达式，用来在一个Generator函数里面执行另一个Generator函数
    function* f(){
        yield 'a';
        yield 'b';
        return 'c'
    }
    let gen = f();
    console.log(gen.next());    //{"value":'a',"done":false}
    console.log(gen.next());    //{"value":'b',"done":false}
    console.log(gen.next());    //{"value":'c':"done":true}

    function* g(){
        yield 'x';
        yield* f();
        yield 'y';
    }

    let gen1 = g();
    console.log(gen1.next());    //{"value":"x","done":false}
    console.log(gen1.next());    //{"value":"a","done":false}
    console.log(gen1.next());    //{"value":"b","done":false}
    console.log(gen1.next());    //{"value":"y","done":false}
    console.log(gen1.next());    //{"value":undefined:"done":true}
}

{
    //yield表达式后面如果是一个generator方法的话，一定要在yield后面加入*，
    //否则执行next()方法，不会返回遍历器对象的内部值，会是返回方法对应的遍历器对象。

    function* f1(){
        yield 'Hello';
    }

    function* f2(){
        yield "open";
        yield f1();
        yield "close";
    }

    for(let item of f2()){
        console.log(item);    //open, f1{ suspended }, close
    }

    //如果yield后面返回的是一个遍历器对象，则要在yield后面加一个*，
    //表示后面返回的是一个遍历器对象，这被称为yield* 表达式。

    function* f3(){
        yield "open";
        yield* f1();
        yield "close";        //open, Hello, close
    }

    for(let item of f3()){
        console.log(item);    //open, Hello, close
    }
}

{
    //如果被嵌套的generator方法内部含有return语句，则在写yield*表达式时，
    //要写成var result = yield* gen();，这样result就指向嵌套方法的返回值。

    function* f(){
        yield 'a';
        yield 'b';
        return 'c';
    }

    function* g(){
        yield 'x';
        var res = yield* f();
        yield res;
        yield 'y';
    }

    let gen = g();
    console.log(gen.next());   //{"value":'x','done':false}
    console.log(gen.next());   //{"value":'a','done':false}
    console.log(gen.next());   //{"value":'b','done':false}
    console.log(gen.next());   //{"value":'c',"done":false}
    console.log(gen.next());   //{"value":'y',"done":false}
    console.log(gen.next());   //{"value":undefined:"done":true}
}

{
    //实际上，yield*后面不仅可以跟Generator方法，任何具有iterator接口的值或者对象都可以
    //Array
    function* f(){
        yield ['a','b','c'];
        yield* ['a','b','c'];
    }

    let gen = f();
    console.log(gen.next());    //{"value":["a","b","c"],"done":false}
    console.log(gen.next());    //{"value":"a","done":false}
    console.log(gen.next());    //{"value":"b","done":false}
    console.log(gen.next());    //{"value":"c","done":false}
    console.log(gen.next());    //{"value":undefined,"done":true}  
}

{
    //定义二叉树类
    class Tree{
        constructor(left,label,right){
            this.left = left;
            this.label = label;
            this.right = right;
        }            
    };

    //定义Generator函数，用于遍历二叉树
    function *inorder(treeNode){
        if(treeNode){
            yield* inorder(treeNode.left);
            yield treeNode.label;
            yield* inorder(treeNode.right);
        }
    }

    //生成二叉树对象方法
    function makeTree(array){
        if(array.length === 1)
            return new Tree(null,array[0],null);
        return new Tree(makeTree(array[0]),array[1],makeTree(array[2]));
    }

    let arrayTree = [[['a'],'b',['c']],'d',[['e'],'f',['g']]];
    let tree = makeTree(arrayTree);//初始化二叉树对象

    let result = [];
    for(let node of inorder(tree)){
        result.push(node);
    }

    console.log(result);
}


