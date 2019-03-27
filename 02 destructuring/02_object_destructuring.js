/*
对象的解构赋值
*/

{
    let {foo,bar} = {foo:'a',bar:'b'};
    console.log('foo is '+foo);
    console.log('bar is '+bar);
    //对象的解构和数组的不同之处。数组的赋值是按数组内元素次序排列赋值的，
    //对象的赋值是按照属性名相同的模式，赋值的。
    let{x,y} = {y:1,x:2};           //x=2,y=1
    console.log("x is "+x);
    console.log("y is "+y);
    //如果某变量再等号右边的对象中找不到同名的属性，则此变量取不到值。
    let {baz} = {foo:"aa",bar:"bb"};
    console.log("baz is "+baz);     //baz=undefined
}

{
    /*
    对象的解构赋值，实际上是找到其同名属性，然后再赋值给对应的变量。
    真正被赋值的是后者，不是前者。
    */
    let{foo:baz}={foo:"aaa",bar:"bbb"};    //foo=undefined,baz="aaa";
    console.log("baz is "+baz);    

    //对象的解构赋值，同样支持嵌套解构。
    let obj = {
        p:[
            "hello",
            {y:'World'}
        ]
    };

    //p是属性名，不是变量，因此不会被赋值
    let {p:[x,{y}]} = obj;   //x="hello",y="World"
    console.log("x is "+x);
    console.log("y is "+y);

    let node = {
        loc:{
            start:{
                line:1,
                column:5
            }
        }
    };

    let{loc,loc:{start},loc:{start:{line}}} = node;
    console.log(loc);                   //{start:{line:1,column:5}}
    console.log(start);                 //{line:1,column:5}
    console.log(line);                  //1
   
    {
        let obj = {};
        let arr = [];
        ({foo:obj.prop,bar:arr[0]}={foo:123,bar:true});
        console.log(obj);               //{prop:123}
        console.log(arr);               //[true]
    }
    
}

{
    /*
    对象的解构也可以指定默认值
    */
    let {x = 3} = {};
    console.log("x is "+x);            //x=3
    let {a,b=5} = {a:2};
    console.log("a is "+a);            //a=2
    console.log("b is "+b);            //b=5
    let {foo:bar=5} = {};
    console.log("bar is "+bar);        //bar = 5
    let {first,second:baz=3}={first:6};
    console.log("baz is "+baz);
    console.log("first is "+first);
    
    {
        //默认值生效的条件是，对象的属性值全等于undefined
        let {x:y = 3} = {x:undefined };
        console.log("y is "+y);         //y = 3
        let {a:b = "abc"} = {a:null};
        console.log("b is "+b);         //b = null
    }

    {
        //如果解构模式是嵌套的对象，且子对象所在的父属性不存在，那么将会报错。
        try{
            let {foo:{bar}} = {bar:"baz"};
        }catch(e){
            console.error(e);
        }    
        
        let{foo:{bar}} = {foo:{bar:'baz'}}
        console.log("bar is "+bar);
    }

    {
        //如果要讲一个已经声明的变量用于解构赋值，必须注意写法
        let x;
        // {x} = {x:1}       //SyntaxError
        //Javascript引擎会将{x}理解成块级作用域，从而发生语法错误。
        //只有不将大括号写在行首，避免javascript将其解释为块级作用域，才能解决这个问题。
        ({x} = {x:1});
        console.log("x is "+x);
    }

    {
        //对象的解构赋值，可以很方便的将现有对象的属性或方法，赋值到某些变量
        let {log,sin,cos} = Math;
        console.log(log.toString());
        console.log(sin.toString());
        console.log(cos.toString());
        //上面将Math内的log/sin/cos函数复制到对应的变量上。使用起来很方便

        let arr = [1,2,3];
        let {0:first,1:second,2:third} = arr;
        console.log("first is "+first);
        console.log("second is "+second);
        console.log("third is "+third);
    }
}