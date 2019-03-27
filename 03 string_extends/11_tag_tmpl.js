/*
标签模板
模板字符串可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。
*/

{
    console.log(123);
    console.log('123');
    //模板标签其实不是模板，而是函数调用的一种特殊形式。
    //标签指的就是函数，紧跟在后面的模板字符串就是它的参数
    console.log`123`;
    //如果模板字符串里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，在调用函数。
    let a = 5, b = 10;
    //tag是一个函数，整个表达式的返回值，就是tag函数处理模板字符串后的返回值。
    let result = tag`Hello ${a+b} world ${a*b}`;     //等同于tag(['Hello ',' world ',''],a+b,a*b);
    console.log('result is '+result);
    function tag(s,v1,v2){
        console.log(s);
        console.log(v1);
        console.log(v2);
        return 'OK';
    }
}

{
    //复杂的例子
    let total = 30;
    let msg = passthru`The total is ${total} (${total*1.05} width tax)`;

    function passthru(literals,...values){
        let output = "";
        let index;
        for(index = 0; index < values.length; index++){
            output+=literals[index] + values[index];
        }

        output += literals[index];
        return output;
    }

    console.log(msg);
}

{
    //标签模板的一个作用，过滤HTML字符串，防止用户输入恶意内容
    let sender = '<script>let abc;</script>';
    let message = SaferHTML`<p>${sender} has sent you a message.`;
    //将模板于用户参数分隔开
    function SaferHTML(arr,...values){
        let s = arr[0];
        //遍历参数数组
        for(let value of values){
            //替换参数当中的&，<,>特殊字符
            s += value.replace(/&/g, "&amp;").replace(/</g,"&lt;").replace(/>/g,'&gt;');
        }

        s+=arr[1];

        return s;
    }

    console.log(message);
}