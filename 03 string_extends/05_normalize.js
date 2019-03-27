/*
normalize()
ES6提供了字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式
*/

{
    //表示Ǒ的两种方式
    var str1 = "\u01D1";
    console.log("str1 is "+str1);
    var str2 = "\u004F\u030C";
    console.log("str2 is "+str2);
    console.log("str1 === str2 is "+(str1===str2));     //两个字符虽然看起来一样，但是却不想等

    console.log("str1 length is "+str1.length);         //str1 length is 1
    console.log("str2 length is "+str2.length);         //str2 length is 2
    //Unicode正规化
    console.log("str1.normalize() === str2.normalize() is "+(str1.normalize() === str2.normalize()));

    /*
    normalize方法可以接受一个参数来制定normalize的方式，
    参数的四个可选值如下：NFC(默认：标准等价合成)/NFD（标准等家分解）/NFKC(兼容等价合成)/NFKD（兼容等价分解）
    NFC:返回多个简单字符的合成字符，“标准等价”指的是视觉和语义上的等价。
    NFD:返回合成字符的多个简单字符。
    NFKC:返回多个简单字符的合成字符，“兼容等价”指的是语义上等价，但视觉上不等价。
    NFKD:返回合成字符的多个简单字符。
    normalize方法不识别中文。
    normalize方法不能识别三个或三个以上字符的合成。这种情况下，还应该使用正则表达式，通过Unicode编号区间来判断    
    */

    console.log("normalize方法不识别中文。");
    console.log("normalize方法不能识别三个或三个以上字符的合成。这种情况下，还应该使用正则表达式，通过Unicode编号区间来判断 ");
}

