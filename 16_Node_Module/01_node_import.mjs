/*
Node加载
Node有独立的CommonJS模式来引入模块，与ES6是不兼容的，
如果想要引用ES6的import语法，现有两个方案。
*/

//1.凡是含有import或者export命令的脚本，都要采用mjs扩展名
//node --experimental-module xxxx.mjs
//CommonJS的require()无法引入mjs文件，只有import命令可以。
//由于该功能目前仍处于试验阶段，所以要用--experimental-module参数才能开启该功能。
import app from './assets/my_app.mjs';
console.log(app);    //{name:'tianzhiqiang',birth:2019-05-25T00:00:00.000Z}

//2.通过安装babel-cli babel-preset-env来让NodeJs兼容ES6的模块语法，
//详情请看02_babel_node.js

