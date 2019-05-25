export default class MemberInfo{
    constructor(name,birth){
        this.name=name;
        this.birth=new Date(Date.parse("1988-11-20"))
    }

    getAge(){
        return Math.floor((Date.now()-this.birth.valueOf())/(1000*3600*24*365));
    }
}