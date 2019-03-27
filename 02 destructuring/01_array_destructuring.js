/*
ES6允许按照一定模式，从数组和对象提取值，对变量进行赋值，这被成为解构。
*/
{
    let [a,b,c] = [1,2,3];
    console.log("a is "+a);     //1
    console.log("b is "+b);     //2
    console.log("c is "+c);     //3
}


//可以从数组中提取值，按照对应位置，对变量赋值。
//这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
{
    let [foo,[bar,baz]] = [1,[2,3]];
    console.log("foo is "+foo);     //1
    console.log("bar is "+bar);     //2
    console.log("baz is "+baz);     //3
    {
        //不完全结构，等号左边，只匹配了一部分右边的数组，这种情况，结构依然成功
        let[,,third] = ['foo','bar','baz'];     
        console.log("third is "+third);     //baz

        let[x,,y] = [1,2,3,4];
        console.log("x is "+x);       //1
        console.log("y is "+y);       //3

        let[head,...tail] = [1,2,3,4];
        console.log("head is "+head);        //1
        console.log(tail);                   //[2,3,4]
    }
    
    {
        //如果解构不成功，变量的值为undefined
        let[a,b,...c] = [1];
        console.log("a is "+a);       //1
        console.log("b is "+b);       //undefined    
        console.log(c);               //[]
    }
    
    {
        //如果等号左边是数组，右边不是数组，则会报错
        try{
            let [foo] = 1    //1，转换为对象以后，不具备Iterator接口
            let [bar] = {}   //{}，本身不具备Iterator接口
        }catch(e){
            console.error(e);     //1 is not iterable
        }
    }

    {
        //只要某种数据结构具有Iterator接口，都可以采用数组型的解构赋值
        function* fibs(){
            let a = 0,
                b = 1;
            while(true){
                yield a;
                [a,b] = [b,a+b];
            }
        }

        let [first,second,third,fourth,fifth,sixth] = fibs();
        console.log("sixth is "+sixth);
        console.log("还没有该明白这段代码什么意思，继续向下读。");
    }
}

/*
解构赋值允许制定默认值
*/

{
    let [foo = true] = [];                //等号右边的数组是空的，没有赋值，foo变量指向默认值true。
    console.log("foo is "+foo);

    let [x,y='b'] = ['a']                 //x = 'a',y = 'b'
    console.log("x is "+x);
    console.log("y is "+y);

    {
        //ES6内部使用严格相等运算符===，判断一个位置是否有值。所以只有当一个数组成员全等于undefined，默认值才会生效
        let [x = 1] = [undefined];        //x = 1
        console.log('x is '+x);
        let [y = 1] = [null];             //y = null
        console.log('y is '+y);
    }

    {
        //如果默认值是一个表达式，那么表达式时惰性求值的，只有在用到的时候，才会求值。
        function f(){
            console.log('aaa')
        };
        let [x = f()] = [1];
        console.log(x);
        let [y = f()] = [];
        console.log(y);
    }

    {
        //默认值可以引用解构赋值的其它变量，但是变量必须已经声明，否则就会出现“暂时性死区”
        let [x=1,y=x] = [];         //x=1,y=1
        console.log("x is "+x);
        console.log("y is "+y);

        let [a=1,b=a] = [2];         //x=2,y=2
        console.log("a is "+a);
        console.log("b is "+b);

        let [foo=1,bar=foo] = [1,2];    //foo=1,bar=2
        console.log("foo is "+foo);
        console.log("bar is "+bar);
    }
            
}
