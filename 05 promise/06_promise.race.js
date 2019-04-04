/*
Promise.race()
与Promise.all()一样，都是将多个Promise对象包装成一个Promise对象
*/

{
    //假设p1,p2,p3三个Promise对象之中，有一个对象的状态率先改变，
    //则p的状态就跟着改变。而那个最先改变状态的Promise对象的返回值就是p对象回调函数的参数

    //const p = Promise.race([p1,p2,p3]);

    //Promise.race()方法的参数，必须是Promise对象，
    //如果不是，则必须将其转换为Promise对象，才能继续处理
}