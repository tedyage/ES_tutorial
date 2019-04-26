/*
generator函数
*/

{
    //执行Generator函数会返回一个iterator遍历器对象
    //可以依次遍历Generator函数内部的每一个状态。

    //Generator函数是一个普通函数，但是有两个特征。
    //1.function关键字与函数名之间，用*相隔
    //2.方法内部有yield表达式，yield的意思是“产出”
}

{
    //Generator函数实例
    function* helloWorldGenerator(){
        yield 'Hello';
        yield 'World';
        return 'ending';
    }

    let hw = helloWorldGenerator();
    console.log(hw.next());         //调用iterator指针对象的next()方法，返回结果对象value:Hello代表，当前遍历的值是Hello，done:false代表，遍历没有结束
    console.log(hw.next());         //调用iterator指针对象的next()方法，返回结果对象value:World代表，当前遍历的值是World，done:false代表，遍历没有结束
    console.log(hw.next());         //调用iterator指针对象的next()方法，返回结果对象value:ending代表，当前遍历的值是ending，done:true代表，遍历结束了
}

{
    //yield表达式
    //yield表达式是暂停表达式
    //它与return语句有相似之处，也有区别。
    //相似之处在于：都能返回紧跟在语句后面的表达式的值。
    //区别在于：yield能让函数暂停执行，并能让函数下次执行时从暂停的位置开始；但是return语句不具备此功能。
              //一个语句可以有多个yield语句，但是只能有一个return语句。
    
    //如果Generator函数内部没有yield表达式，那么它与普通函数无异。
    function* f(){
        console.log('执行了。');
    }

    var generator = f();   //将此函数的遍历器指针对象赋给变量generator，此时不会立即执行此函数

    generator.next();      //执行next方法，由于函数体内没有yield表达式，所以遍历器经过一次循环就完成了遍历，最终结束运行
    //执行了。

    //yield语句只能在generator函数中执行，如果加在普通函数中，会报错。
    // function foo(){
    //     yield 'Hello World';      //Unexpected string
    // }

    //yield语句如果放在一个表达式当中，则必须放在圆括号里面。
    function* demo(){
        console.log('Hello ' + (yield));
        //console.log('Hello' + yield);        //Unexpected identifier
        console.log('Hello ' + (yield 123));
    }

    let d = demo();
    d.next();                //Hello undefined

    //yield表达式用作函数参数或是放在赋值表达式的右边，可以不加括号
    function* demo2(){
        foo (yield 'Hello', yield 'World');
        let input = yield;
    }

    function foo(a,b){
        console.log(a);
        console.log(b);
    }
}

