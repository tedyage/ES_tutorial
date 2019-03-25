/*
解构赋值时，如果等号右边的时Number或者Boolean类型的，则先转换为Number对象或者Boolean对象
*/

{
    let{valueOf:a} = 123;
    console.log("a is "+a);
    let{valueOf:x} = true;
    console.log("x is "+x);

    /*
    解构复制的规则时：凡是等号右边不是对象或数组的，都要先转换为对象，
    由于undefined和null无法转为对象，所以undefined和null不能解构赋值
    */

    //TypeError
    //let {a} = undefined;
    //let {b} = null;
}