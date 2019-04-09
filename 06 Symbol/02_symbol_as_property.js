/*
Symbol值作为属性名
由于没有Symbol值都是不相等的，所以Symbol值可以用于做对象的属性名，
这就保证不会出现同名的属性。
这对于一个对象有多个模块构成的情况非常有用，能防止一个属性被改写或覆盖
*/

{
    let mySymbol = Symbol();
    //写法1
    let obj = {};
    obj[mySymbol] = 'Hello';
    obj.mySymbol = "World";
    console.log("obj[mySymbol] is "+obj[mySymbol]);  //obj[mySymbol] is Hello
    console.log("obj.mySymbol is "+obj.mySymbol);    //obj.mySymbol is World
    //写法2
    obj = {
        [mySymbol]:'Hello',
        mySymbol:"World"
    };
    console.log("obj[mySymbol] is "+obj[mySymbol]);  //obj[mySymbol] is Hello
    console.log("obj.mySymbol is "+obj.mySymbol);
    //写法3
    Object.defineProperty(obj,mySymbol,{value:'Hello'});      
    Object.defineProperty(obj,"mySymbol",{value:'World'});
    console.log('obj[mySymbol] is '+obj[mySymbol]);
    console.log('obj.mySymbol is '+obj.mySymbol);

    //Symbol值作为属性名，不能用.运算符，因为.运算符后面总是字符串类型的属性，所以不会读取Symbol所标识的属性。
    //在对象内部，使用Symbol值定义属性时，Symbol值必须放在[]之间。
}

{
    //给Symbol值标识的属性指向一个方法
    let f = Symbol();
    let obj = {
        [f]:function(arg){
            console.log(arg);
        }
    }
    
    obj[f](123);
    //可通过增强的对象写法，简化对象的定义
    obj = {
        [f](arg){
            console.log(arg);
        }
    }
    obj[f](456);
}

{
    //Symbol值可以给常量赋值，保证每个常量的值都是不相等的。
    const COLOR_RED = Symbol('Red');
    const COLOR_GREEN = Symbol('Green');

    function getColor(color){
        switch(color){
            case COLOR_RED:
                return COLOR_GREEN;
            case COLOR_GREEN:
                return COLOR_RED;
            default:
                throw new Error('Undefined color');
        }
    }

    console.log(getColor(COLOR_RED));
    //由于Symbol值使得没一个常量都不想等，所以可以保证switch语句会按照理想的逻辑工作。
}
