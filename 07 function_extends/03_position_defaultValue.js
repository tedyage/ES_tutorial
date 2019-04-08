/*
参数默认值的位置
*/

{
    //一般情况下，拥有默认值的参数，都是放在参数群的末尾，
    //这样做是为了方便确定哪些参数可以省略传值.
    function f(x,y,z=2){
        console.log([x,y,z]);
    }

    f('a',1);

    //如果不放在末尾，则可能不会打到参数默认值的效果，有默认值的参数很可能还需要赋值。
    function f1(x,y=3,z){
        console.log([x,y,z]);
    }

    f1(1,2);         //[1,2,undefined]
    //f1(1,,2);      //报错，Unexpected token ,
    f1(undefined,2,undefined);   //[undefined,2,undefined]
    f1(1,undefined,2) //[1,3,2]
    //如果有默认值的参数不在参数的末尾，则无法省略赋值，除非赋值undefined
    //对于有默认值的参数，如果赋值undefined，则该参数仍等于默认值，
    //如果赋值null，则该参数等于null。
    f1(1,null,2)      //[1,null,2]
}