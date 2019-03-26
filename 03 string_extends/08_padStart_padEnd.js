/*
padStart(),padEnd()
ES2017引入了字符串不全长度的功能，如果某个字符串不够指定长度，可在头部或尾部补全
*/

{
    //padStart()用于头部补全
    let str1 = "123";
    //该方法不会修改源字符串，会返回新的字符串，
    //第一个参数表示字符串补全后的最大长度，
    //第二个参数表示补充的字符串
    console.log("str1.padStart(4,'￥') is "+str1.padStart(4,'￥'));
    console.log("str1.padEnd(8,'.00') is "+str1.padEnd(8,'.00'));
    //如果原字符串长度，大于等于字符串补全后最大长度，则，补全不生效，仍返回源字符串
    console.log("str.padStart(2,'0') is "+str1.padStart(2,'0'));
    console.log("str.padEnd(2,'0') is "+str1.padEnd(2,'0'));
    //如果用来不全的字符串长度与源字符串长度相加，超过了指定的最大长度，则会从补全字符串尾部截取超出位数。
    console.log("str.padStart(10,'0123456789') is "+str1.padStart(10,'0123456789'));
    console.log("str.padEnd(10,'0123456789') is "+str1.padEnd(10,'0123456789'));
}

{
    //padStart()用途
    //1.补全数值到指定位数，制定编号
    let str = '1';
    console.log("str.padStart(4,'0') is "+str.padStart(4,'0'));
    //2.提示字符串格式
    let str2 = '30'
    console.log('str2.padStart(10,"yyyy-MM-dd) is '+str2.padStart(10,"yyyy-MM-dd"));
}