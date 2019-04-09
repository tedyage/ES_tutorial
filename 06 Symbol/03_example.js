/*
使用Symbol的实例
*/

{
    //1.消除在代码中多次出现与代码形成强耦合的某些字符串或数值，
    //这种做法叫：消除魔术字符串

    function getArea(shape,options){
        let area = 0;
        switch(shape){
            case 'Triangle':{
                area = .5 * options.Width * options.Height;
                break;
            }
            default:{
                throw new Error("Error Shape.");
            }
        }
        return area;
    }

    console.log(getArea('Triangle',{Width:100,Height:100}));
    //上端代码中，Triangle就是魔术字符串。
    //常用的消除魔术字符串的方法，就是把它写成变量

    const shapeType = {
        triangle: 'Triangle'
    };

    function getArea1(shape,options){
        let area = 0;
        switch(shape){
            case shapeType.triangle:{
                area = .5 * options.Width * options.Height;
                break;
            }
            default:{
                throw new Error("Error Shape.");
            }
        }
        return area;
    }

    console.log(getArea(shapeType.triangle,{Width:100,Height:100}));
    //上端代码中，我们将字符串提取到一个shapeType对象的属性中，这样就能消除魔术字符串。
    //而为了确保shapeType里面的属性名不与其它属性名冲突，可以将其属性名改成Symbol值
    let triangle = Symbol();
    const shapeType2 = {
        [triangle]: 'Triangle'
    };
    function getArea2(shape,options){
        let area = 0;
        switch(shape){
            case shapeType2[triangle]:{
                area = .5 * options.Width * options.Height;
                break;
            }
            default:{
                throw new Error("Error Shape.");
            }
        }
        return area;
    }
    console.log(getArea(shapeType2[triangle],{Width:100,Height:100}));
}