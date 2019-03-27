/*
模板实例
*/

{
    //此模板字符串之中，放置了一个常规模板，
    //改模板使用<%......%>放置javascript代码，
    //使用<%=...%>输出javascript表达式。
    let tmpl = `
    <ul>
        <%for(let i = 0; i< data.supplies.length; i++){%>
            <li><%= data.supplies[i]%></li>
        <%}%>
    </ul>
    `;

    console.log(tmpl);

    //接下来编译这个模板字符串
    //一种思路是将其转换为javascript表达式字符串
    /*echo('<ul>');
    for(let supply of data.supplies){
        echo('<li>');
        echo(supply);
        echo('</li>');
    }
    echo('</ul>');*/

    function compile(tmpl){
        //这个转换使用正则表达式就行了
        const evalExpr = /<%=(.+?)%>/g;
        const expr = /<%([\s\S]+?)%>/g;

        tmpl = tmpl.replace(evalExpr,'`); \n echo( $1 ); \n echo(`')
               .replace(expr,'`); \n $1 \n echo(`');
        tmpl = 'echo(`'+tmpl+'`);';

        //然后，将tmpl封装在一个函数里面返回，就可以了。
        let script = 
        `(function parse(data){
            let output = "";

            function echo(html){
                output+=html;
            }

            ${tmpl}

            return output;
        })`;

        return script;
    }

    //利用eval函数，传入编写parse函数字符串，parse方法内部包含
    //定义echo方法。
    //将<%...%>和<%=...%>替换成echo犯法，使得模板字符串的对应变量都是调用echo方法的结果。
    //输出最终字符串。
    let parse = eval(compile(tmpl));
    console.log(parse({supplies:['broom','mop','cleaner']}));

    console.log("还没有完全掌握。记住这里。");
    
}