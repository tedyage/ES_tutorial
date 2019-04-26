/*
next方法的参数
*/

{
    //yield表达式本身并没有返回值，或者说返回的是undefined
    //但是如果在调用next方法时，传入参数，那么这个参数就是上一个yield表达式的返回值。

    function* f(){
        for(i=0;true;i++){
            console.log(i);
            let reset = yield i;         //将yield i的返回值赋给reset
            console.log(reset);
            if(reset){
                i = -1;
            }
        }
    }

    let g = f();
    g.next();        //第一次，从函数开始执行到了yield i，暂停执行。只执行了一个console.log(i)，所以输出了0；
    g.next();        //第二次，从上一个yield i继续执行，由于yield表达式返回undefined，所以reset的值是undefined，所以输出reset得到的是undefind，
                     //只想到接下来的yield i时，暂停执行。i为1，所以i输出了1；undefined 1;
    g.next(true);    //第三次，从上一个yield i继续执行，由于next方法中传入了参数为true，所以上一个yield i表达式的返回值就是true，即reset的值
                     //是true。执行到if语句，判断reset为true成立，执行i = -1，当执行到下一个循环时，i的值为0，所以输出i是0；

    //Generator函数从暂停到恢复运行，它的上下文状态是不变的。
    //通过next()的传参，就有办法在Generator函数开始运行之后，继续向函数体内不注入值。
    //也就是说，Generator函数在运行的不同阶段，都可以从外部注入不同的值。

    //下面写了一个计算器函数的例子
    function* Calcu(x){
        let y = 2 * (yield (x+1));
        let z = yield (y/3);
        return (x+y+z);
    }

    let a = Calcu(5);
    a.next();   //{value:6;done:false},
    a.next();   //{value:NaN;done:false},
    a.next();   //{value:NaN;done:true}
    
    let b= Calcu(5);
    a.next();   //{value:6;done:false},  x=5
    a.next(12); //{value:8;done:false},  y=2*12,y=24  
    a.next(13); //{value:42;done:true}   z=13, x+y+z=5+24+13 =42
    //注意由于next()的参数标识上一个yield表达式的返回值，所以在第一次使用next方法时，
    //函数是从头开始执行的，不存在上一个yield表达式，所以第一次使用next方法传的参数是无效的。
}