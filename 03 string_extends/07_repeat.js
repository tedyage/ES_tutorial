/*
repeat()，返回一个新的字符串，表示将源字符串重复n次
*/

{
    let str1 = "Hello";
    //repeat()方法不会修改源字符串，会输出新的字符串
    console.log("str.repeat(3) is "+str1.repeat(3));
    //参数如果是小数，会被取整，相当于Math.floor
    console.log("str.repeat(1.4) is "+str1.repeat(1.4));
    console.log("str.repeat(1.5) is "+str1.repeat(1.5));
    //参数如果是负数,Infinity，执行语句会报错
    //参数如果是NaN，执行语句返回空字符串
    {
        try{
            let str = "Hello World!";
            console.log("str.repeat(-1) is "+str.repeat(-1));     //Invalid count value
        }
        catch(e){
            console.error(e);
        }

        try{
            let str = "Hello World!";
            console.log("str.repeat(Infinity) is "+str.repeat(Infinity));     //Invalid count value
        }
        catch(e){
            console.error(e);
        }

        {
            //如果参数是在（-1，1）区间之间的，由于会对参数取整，所以取整之后是0，
            //str.repeat(0)返回空字符串，表示一次不输出
            let str = "Hello World!";
            console.log("str.repeat(-0.3) is "+str.repeat(-0.4));    //返回空字符串
            //str.repeat(NaN)等同于str.repeat(0)
            console.log("str.repeat(NaN) is "+str.repeat(NaN));      //返回空字符串
        }

        {
            //如果参数除整型之外的其他类型，会先转换成数字。
            let str = "Hello World!";
            console.log("str.repeat(\"e\") is "+str.repeat("e"));     //e转换为数字类型是NaN
            console.log("str.repeat(\"true\") is "+str.repeat("true"));     //true字符串转换为数字类型是NaN
            console.log("str.repeat(true) is "+str.repeat(true));     //true字符串转换为数字类型是1
            console.log("str.repeat(undefined) is "+str.repeat(undefined));     //undefined转换为数字类型是NaN
            console.log("str.repeat(null) is "+str.repeat(null));     //undefined转换为数字类型是NaN
        }
    }
}