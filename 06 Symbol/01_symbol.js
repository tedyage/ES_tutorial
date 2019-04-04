/*
ES6引入了一个Symbol数据类型，表示独一无二的值
*/

{
    //在Symbol之前，原始数据类型包括：null undefined Number Boolean String Object
    //Symbol值通过Symbol函数生成
    let s = Symbol();
    console.log("typeof s is "+ typeof s);     //typeof s is symbol
    console.log("Object.prototype.toString.call(s) is "+Object.prototype.toString.call(s));    //[object Symbol]
    //注意，Symbol函数前不允许使用new关键字，
    //这是因为Symbol属于原始类型，不是引用类型
    //所以Symbol类型的值是不能添加属性的。
}

{
    //Symbol函数可以接受一个字符串作为参数，
    //该字符串只能表示对这个Symbol值的表示描述信息，方便与其它Symbol值区分

    let s1 = Symbol('This is the first Symbol');
    let s2 = Symbol("This is the second Symbol");

    //字符串只是对这个Symbol实例，进行了描述，便于区分，不会改变它的值
    console.log(s1.toString());   //Symbol(This is the first Symbol)
    console.log(s2.toString());   //Symbol(This is the second Symbol)

    //如果Symbol()的参数是一个对象，就会调用对象的toString()方法，转换为字符串，然后生成一个Symbol值
    let obj = {
        toString:function(){
            return 'This is a Object';
        }
    }
    let s3 = Symbol(obj);         //调用obj的toString()方法，返回的是字符串'This is a Object'，所以这就是描述Symbol的字符串
    console.log(s3.toString());   //Symbol(This is a Object)
}

{
    //Symbol函数的参数只是表示对当前Symbol值的描述信息，因此相同参数的Symbol函数返回值是不相等的。
    let s1 = Symbol();
    let s2 = Symbol();

    console.log('s1 === s2 is '+(s1===s2));

    let s3 = Symbol('abc');
    let s4 = Symbol('abc');
    console.log('s3 === s4 is '+(s3===s4));
}

{
    //Symbol的值不能与其他类型的值进行运算，否则会报错
    let sym = Symbol('My symbol');
    try{
        var str = 'This is a '+sym;   
        //Cannot convert a Symbol value to a string
    }catch(e){
        console.error(e.message);
    }
    
    //Symbol的值可以隐式或者显式转换为字符串
    try{
        let str1 = sym.toString();
        console.log("str1 is "+str1);    //str1 is Symbol(My symbol)
        let str2 = String(sym);
        console.log("str2 is "+str2);    //str2 is Symbol(My symbol)
    }catch(e){
        console.error(e.message);
    }

    //Symbol的值可以显示转换为布尔值
    try{
        let boo = Boolean(sym);
        console.log("boo is "+boo);      //boo is true
        console.log("!boo is "+!boo);    //!boo is false
    }catch(e){
        console.error(e.message);
    }

    //Symbol的值不可以转换为Number类型
    try{
        let num1 = parseInt(sym);        //Cannot convert a Symbol value to a string
        let num2 = Number(sym);          //Cannot convert a Symbol value to a number
    }catch(e){
        console.error(e.message);
    }
}