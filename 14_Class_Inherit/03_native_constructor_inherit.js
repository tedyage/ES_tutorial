/*
原生构造函数的继承
*/

//原生构造函数指的是语言内置的构造函数，通常用来生成数据结构。
//原生构造函数指的是：
//Boolean()/Number()/String()/Array()/Date()/Function()
//RegExp()/Error()/Object()

//在过去，原生的构造函数是无法被继承的，
//因为子类无法获取原生构造函数内部属性。

/*
ES6允许继承原生构造函数来生成子类。
因为ES6是在子类的构造函数中，先新建超类的实例对象，在用子类的构造函数修饰this，
使得超类的所有属性都可以继承
*/

function MyArray(){
    Array.apply(this,arguments);      //继承Array的构造函数
}

MyArray.prototype = Object.create(Array.prototype);  //MyArray获取Array类的所有内部方法
MyArray.prototype.clear = function(){                 //MyArray类内部新定义的clear方法，用于清空数组
    this.splice(0,this.length);
}

let myArray = new MyArray();
console.log(myArray.length);     //0
myArray.push(1);
console.log(myArray.length);     //1
myArray.clear();
console.log(myArray.length);     //0

//下面是通过继承原生构造函数Array，定义的拥有版本功能的数组数据结构
class VersionedArray extends Array{     //继承Array
    constructor(){
        super();
        this.Histories = [[]];          //构造函数中添加了Histories属性，是定义当前操作之前的所有commit过的数组状态
    }

    commit(){
        this.Histories.push(this.slice(0));      //向this.Histories属性添加当前的数组状态
    }

    revert(){                           //恢复上一次提交的数组的状态
        this.Histories.pop();                    
        this.splice(0,this.length,...this.Histories[this.Histories.length-1])
    }
}

let va = new VersionedArray();
console.log(va.Histories);       [[]]
va.push(1);
va.commit();
console.log(va);                 [1]
console.log(va.Histories);       [[],[1]]
va.push(2);
va.commit();
console.log(va);                 [1,2]
console.log(va.Histories);       [[],[1],[1,2]]
va.revert();
console.log(va);                 [1]
//最重要的是，VersionedArray依然是一个普通数组，它拥有Array内部的所有属性和方法


