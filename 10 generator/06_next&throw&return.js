/*
next()/throw()/return()的共同点
*/

{
    //next()/throw()/return()这三个方法的本质，
    //都是让Generator恢复执行，并且使用不同的语句替换yield表达式

    //1.next()方法，使用传入的参数替换yield表达式
    function* f(x,y){
        try{
            let result = yield x+y;
            return result;
        }catch(e){
            return e.message
        }        
    }

    let g= f(1,2);
    console.log(g.next());  //{"value":3,"done":false}   
    console.log(g.next(1));   //{"value":1,"done":true}
    //g.next(1)，就是将let result = yield x+y;
    //替换成let result = 1;

    let g2 = f(1,2);
    console.log(g2.next());  //{"value":3,"done":false}
    console.log(g2.throw(new Error("error")));  //{"value":"error","done":true}
    //g2.throw(new Error("error"))，就是将let result = yield x+y,
    //替换成let result = new Error("error");

    let g3 = f(1,2);
    console.log(g3.next());  //{"value":3,"done":false}
    console.log(g3.return("end"));   //{"value":"end","done":true}
    //g3.return("end")，就是将let result = yield x+y,
    //替换成let result = return "end"
}