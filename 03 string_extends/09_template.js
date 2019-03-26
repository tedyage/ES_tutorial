/*
模板字符串
*/

{
    let person = {
        name:'田志强',
        age:30,
        gender:'man'
    };

    //传统的javascript，输出模板通常方式：
    let str1 = 'My name is '+person.name+
    ', and I\'m '+person.age+
    ', and I\'m a '+person.gender+".";
    console.log(str1);
    //这种写法很不方便

    //ES6引入了模板字符串解决了这个问题。
    //模板字符串是曾庆版的字符串，用反引号（`）标识。
    //它可以用来定义多行字符串，同时在字符串中嵌入变量，变量名需要嵌入到${}之中。
    //${}内部可以放入标识符/表达式/甚至函数，如果${}内部变量没有声明，会报错
    //它会保留所有的空格和缩进。
    let str2 = `
    My name is ${person.name}, 
        and I'm ${person.age},
            and I'm a ${person.gender}.
`;
    console.log(str2);

    let str4 = `
    My name is ${person.name}, 
        and I'm ${person.age},
            and I'm a ${person.gender}.
    `;
    console.log(str4.trim());

    //如果模板字符串中需要输出反引号`，则用\`代替。
    let str3 = `Hello \`World\`.`;
    console.log(str3);

    //如果需要模板字符串在需要时再执行，可以像下面这样写
    let str5 = 'return ' + '`Hello ${name}!`';   //name只在需要时声明，注意单引号和反引号一起使用。
    let fn = new Function('name',str5);    //定义形参是name
    console.log(fn('tianzhiqiang',str5)) ;     //传递参数tianzhiqiang

    let str6 = '(name)=>`Hello ${name}!`';
    let fn1 = eval.call(null,str6);
    console.log(fn1('tianzhiqiang'));    
}