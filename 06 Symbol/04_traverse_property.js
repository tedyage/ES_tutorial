/*
遍历属性名
Symbol值作为属性名，是不会在for(var...in...)中出现的，
也不会在Object.keys()/Ojbect.getOwnPropertyNames()/JSON.stringify中出现。
*/

{
    //Object.getOwnPropertySymbols方法，可以获取对象的Symbols值的属性名。
    let key1 = Symbol('a');
    let key2 = Symbol('b');

    let obj = {
        [key1]:'Hello',
        [key2]:"World",
        key3:'abc'
    };

    console.log(Object.keys(obj));                 //Array ["Key3"]
    console.log(Object.getOwnPropertyNames(obj));  //Array ["Key3"]
    console.log(JSON.stringify(obj));              //{"key3":"abc"}
    console.log(Object.getOwnPropertySymbols(obj));   //Array [Symbol(a),Symbol(b)]

    //Reflect.ownKeys方法可以返回对象中所有类型的属性
    console.log(Reflect.ownKeys(obj)) ;            //["key3", Symbol(a), Symbol(b)]

    //Symbols值标识的属性名，虽然不会被常规方法遍历得到，但是它是非私有属性。
    //利用这一点，我们可以为对象定义一些非私有的，但又只用于内部的方法。
    {
        let size = Symbol('size');

        class Collection{
            constructor(){
                this[size] = 0;
            };

            add(item){
                this[this.size] = item;
                this[size]++;
            };

            static SizeOf(instance){
                return instance[size];
            };
        }

        var list = new Collection();
        console.log(Collection.SizeOf(list))   //0
        list.add('a');
        console.log(Collection.SizeOf(list));  //1
    }
}