const AVL = require('./AVLtree');

const avl = new AVL();


function testFind() {

    const array = [];

    for (let i = 0; i < 10000000; i++) {
        const random = Math.floor(Math.random() * 10000001);
        array.push(random);
    }
    const uniqArray = [...new Set(array)];

    for (const iterator of uniqArray) {
        avl.insert(iterator)
    }


    const findThisNumber = uniqArray[Math.round(uniqArray.length / 2)];

    console.time('findInArray');
    uniqArray.includes(findThisNumber);
    console.timeEnd('findInArray');


    console.time('findInAvl');
    avl.contains(findThisNumber);
    console.timeEnd('findInAvl');
}


function testInsertvsPush() {

    const array = [];

    for (let i = 0; i < 10000000; i++) {
        array.push(i);
    }
    const uniqArray = [...new Set(array)];

    console.time('testInsert')
    for (let i = 0; i < uniqArray.length; i++) {
        avl.insert(uniqArray[i])
    }
    console.timeEnd('testInsert');


    console.time('testPush')
    for (let i = 0; i < uniqArray.length; i++) {
        array.push(uniqArray[i])
    }
    console.timeEnd('testPush');
}

//testFind();
//testInsertvsPush();