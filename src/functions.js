const objectLength = (obj) => {
    const _ = obj;
    let counter = 0;
    Object.keys(_).forEach((el) => {
        _[el] != '' ? counter++ : counter;
    });
    return counter === 0 ? false : true;
};

module.exports.objectLength = objectLength;
