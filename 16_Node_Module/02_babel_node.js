/*
babel_node import
*/
import {add} from "./assets/add"
console.log(add(1,2));

const person = {
    name:'kevin',
    age:31,
    email:"kevin@gmail.com"
}

const address = {
    street: "432 Bryant st.",
    city:"Mountain View",
    state:"California"
}

const personWithAddress= {
    ...person,
    ...address
}

console.log(personWithAddress);

/*
安装babel-cli和babel-preset-env，
创建.babelrc文件.加入babel配置信息{"preset":["env"]}
可以使用export和import
在package.json中，在scripts中加入"start": "babel-node xxxxxx.js"
输入npm start,即可运行
*/