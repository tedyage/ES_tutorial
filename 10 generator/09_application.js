/*
应用
*/
const http = require("http");

{
    //协程（co-routine）
    /*
    协程是一种程序运行的方式，可以理解成“协作的函数”。
    多个函数可以并行执行，
    但是任意时刻，只能有一个函数处于正在运行状态，
    其它函数都处于暂停(suspended)状态。
    函数之间可以交换执行权。

    也就是说，一个函数可以运行到一半，然后将执行权交给另一个函数，并且处于暂停状态，
    知道恢复执行权，继续执行，这种并行执行，交换执行权的的线程，就成为协程。

    在内存中，协程里可以拥有多个堆栈，
    但任意时刻，只能有一个堆栈处于运行状态，
    也就是说，协程是以多占用内存为代价，实现多任务并行的。
    */

    //Generator函数的实现原理
    /*
    普通方法的上下文生成原理：Javascript执行程序的时候，会先生成一个全局上下文环境，
    然后，在执行到某个方法（或代码块）的时候，会在全局上下文环境的上方，加入方法（代码块）的上下文环境，
    由此形成了上下文堆栈，里面存储的都是变量和对象。由于堆栈时后进先出的结构，所以
    最后产生的上下文环境会首先执行完成，推出堆栈，然后再执行它下层的上下文环境，
    直至所有的上下文环境都执行完成，堆栈清空。

    Generator函数的上下文环境比较特殊：它的上下文环境，当遇到yield表达式时，
    会暂时将上下文环境退出堆栈，但是不会消失并且内部的变量和对象的状态会被冻结。
    等到执行到next()方法时，该上下文环境会重新加入到堆栈中，并回复执行。
    */

    function* f(){
        yield 1;       //首次将本上下文环境退出堆栈，并冻结内部变量和对象的状态
        return 2;
    }

    let gen = f();
    gen.next();        //首次将f()的上下文环境加入到内存堆栈中
    gen.next();        //第二次将f()的上下文环境加入到堆栈中，重新恢复运行
}

{
    //应用1.异步操作的同步化表达——Ajax异步请求的同步化

    function getJson(url){
        http.get(url,(res)=>{
            if(res.statusCode===200){
                res.setEncoding("utf-8");
                let data = '';
                res.on('data',(chunk)=>{
                    data += chunk;
                });
                res.on('end',()=>{
                    req.next(data);             //执行req.next(data)，恢复方法的执行状态，重新将当前上下文环境加入到堆栈，
                });                             //一定要将结果当成参数传入next方法，否则无法得知请求的结果。
            }            
        });
    }

    function* request(url){
        let res = yield getJson(url)        //执行getJson(url)，同时暂停该方法的执行状态，冻结上下文环境
        console.log(res);
    }
   
    let req = request("http://keysight-crm.vip.ccwonline.com.cn/Tabs/GetTrades");   //获取遍历器对象req
    req.next();                             //开始执行。
}

{
    //应用2.控制流管理
    console.log("渲染三维场景");
    console.log("---------------------------------------");
    //假设制定步骤顺序为：初始化场景->摄像机->光照->模型->渲染器->渲染
    
    function initSene(status=false){
        if(status){
            console.log("初始化场景。");
        }        
        return status;
    }

    function initCamera(status=false){
        if(status){
            console.log("初始化摄像机。")
        }
        return status;
    }

    function initLight(status = false){
        if(status){
            console.log("初始化光照。");
        }
        return status;
    }

    function initModel(status = false){
        if(status){
            console.log("初始化模型。");
        }
        return status;
    }

    function initRenderer(status = false){
        if(status){
            console.log("初始化渲染器。");
        }
        return status;
    }

    function renderer(status = false){
        if(status){
            console.log("渲染");
        }
        return status;
    }

    //传统的流控制方法是：
    renderer(
        initRenderer(
            initModel(
                initLight(
                    initCamera(
                        initSene(true)
                    )
                )
            )
        )
    );
    //这样写，代码易读性差。并且一旦出现问题，不易于排查。
    console.log("---------------------------------------");                   
    //采用Promise修改上面的代码
    Promise.resolve(initSene(true))
    .then(data=>initCamera(data))
    .then(data=>initLight(data))
    .then(data=>initModel(data))
    .then(data=>initRenderer(data))
    .then(data=>renderer(data));
    //这样写，提高了移动性，但是重复的Promise语法太多。
    console.log("---------------------------------------");  
    //编写协程函数
    function* runningTask(value){
        try{
            let value1 = yield initSene(value);
            let value2 = yield initCamera(value1);
            let value3 = yield initLight(value2);
            let value4 = yield initModel(value3);
            let value5 = yield initRenderer(value4);
            yield renderer(value5);
            return;
        }catch(e){
            console.error(e.message);
        }       
    }

    function schedular(task){
        let taskObj = task.next(task.value);

        if(!taskObj.done){
            task.value = taskObj.value;
            schedular(task);
        }
    }

    schedular(runningTask(true));
    //这样写，易读性更强，且重复的语法更少。

}