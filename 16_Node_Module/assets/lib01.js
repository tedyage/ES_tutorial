let counter = 3

function incounter(){
    counter++;
}

function getCounter(){
    return counter;
}

let counterObj = {
    foo:'hello'
}

function modifyCounterObj(){
    counterObj.foo+=" world";
}

module.exports = {
    counter,
    incounter,
    getCounter,
    counterObj,
    modifyCounterObj,
};