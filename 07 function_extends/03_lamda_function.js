/*
箭头函数
ES6，允许使用箭头定义函数，
箭头函数，让代码看着更加简洁
*/
{
    //由于在箭头函数中，{}被定义为代码块，
    //所以当函数要直接返回对象时，应该用()包住要返回的对象
    let f = (name,age)=>({name:name,age:age});
    console.log(f('Tom',10));
}

{
    //箭头函数的一个用途是，简化回调函数
    console.log([1,2,3].map(function(n){
        return n*n;
    }));               //[1,4,9]

    //简化之后
    console.log([1,2,3].map(n=>n*n));  //[1,4,9]

    var values = [2,1,4,3,5,0];
    console.log(values.sort(function(a,b){
        return a-b;
    }));

    console.log(values.sort((a,b)=>a-b));
}

//是用箭头函数时需要注意的点
//1.函数体内的this对象，就是定义时所在的对象，不是使用时所在的对象。
//2.不可以当作构造函数。
//3.不可以在函数体内使用arguments变量，如果要用，可以用rest参数代替。
//4.不可以别用做generator函数

//箭头函数不适用场合
{
    //1.在对象内部定义函数，且函数内部有this，则不适用箭头函数。
    var cat = {
        lives:10,
        jumps:function(){
            this.lives--;      //此时this指向的是cat对象
        }
    }

    var cat1 = {
        lives:10,
        jumps:()=>this.lives--  //此时this指向的是全局对象
    }

    cat.jumps();
    cat1.jumps();
    console.log(cat.lives);      //9
    console.log(cat1.lives);     //10，因为this没有指向cat1
}

//2.在需要动态this的时候。