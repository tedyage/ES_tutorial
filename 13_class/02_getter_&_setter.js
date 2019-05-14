//取值函数getter和存值函数setter
/*
class的内部可以使用get和set关键字，
对某个属性设置存值函数和取值函数，
拦截该属性的存取行为
*/
class MyClass{
    constructor(){
        //..constructor
    }

    get foo(){
        return 'foo';
    }

    set foo(value){
        console.log('setter: '+value)
    }
}

let myclass = new MyClass();
myclass.foo = 123;               //setter: 123
console.log(myclass.foo);        //foo
/*
foo属性有了对应的存值函数和取值函数，
因此赋值和读取行为都被自定义了。
*/

class CustomHTMLElement{
    constructor(element){
        this.element = element;
    }

    get html(){
        return this.element.innerHTML;
    }

    set html(value){
        this.element.innerHTML = value;
    }
}

//getter和setter函数都是设置在类原型对象的自有属性的描述符上。
let descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype,'html');
console.log('get' in descriptor);       //true
console.log('set' in descriptor);       //true